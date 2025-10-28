import { eq } from "drizzle-orm"
import { db } from "../../database"
import { CredentialsTable, usersTable } from "../../database/schema"
import { loginValidator } from "../../validation/auth/login.validation"
import z from "zod"
import { HTTPException } from "hono/http-exception"
import { generateToken } from "../../utils/tokenGenerator..util"
import { Context } from "hono"

type CredentialsType = z.infer<typeof loginValidator>

export const loginService = async(c: Context, credentials: CredentialsType )=>{
    try {
        const [foundUser] = await db.select({
            id: usersTable.id,
            hashedPassword: CredentialsTable.hashedPassword,
            role: CredentialsTable.role
        })
        .from(usersTable)
        .innerJoin(CredentialsTable, eq(CredentialsTable.userID, usersTable.id))
        .where(eq(usersTable.email, credentials.email))
        .limit(1)

        if(!foundUser) throw new HTTPException(401, {message: "Invalid email or password"})

        const matchedPassword = await Bun.password.verify(credentials.password, foundUser.hashedPassword)
        
        if(!matchedPassword) throw new HTTPException(401, {message: "Invalid email or password"})
        
        //generate token
        const {id, role} = foundUser

        if(!role) throw new HTTPException(401, {message: "User role cannot be determined"})
        
        const success = await generateToken(c, {id, role})

        if(!success) throw new HTTPException(500, {message: "Unexpected error occured during proccess, unable to create token"})
        
        return {"message": "Loggin successful"}
    } catch (error) {
        console.log(error)
        if(error instanceof HTTPException){
            throw new HTTPException(error.status, {message: error.message})
        }

        throw new HTTPException(500, {message: "Unable to create a new account"})
    }
}