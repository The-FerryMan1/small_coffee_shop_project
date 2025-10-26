import z from "zod"
import { registerValidator } from "../../validation/auth/register.validation"
import { db } from "../../database"
import { CredentialsTable, usersTable } from "../../database/schema"
import { eq } from "drizzle-orm"
import {HTTPException} from "hono/http-exception"
import { Context } from "hono"
type FormType = z.infer<typeof registerValidator>

export const registerService = async(form:FormType)=>{
    try {

        const foundEmail = await db.$count(usersTable, eq(usersTable.email, form.email))
        if(foundEmail > 0) throw new HTTPException(400, {message: "Email is already taken"})

        await db.transaction(async(tx)=>{
           const [newUser] = await tx.insert(usersTable).values({
                firstName: form.first_name,
                lastName: form.last_name,
                middleName: form.middle_name,
                email: form.email,
            }).returning({id: usersTable.id})

            const hashedPassword = await Bun.password.hash(form.password)
            
            await tx.insert(CredentialsTable).values({
                userID: newUser.id,
                hashedPassword
            })
        })
        
        return {"message": "Account registration completed"}
    } catch (error) {
        console.log(error)
        if(error instanceof HTTPException){
            throw new HTTPException(error.status, {message: error.message})
        }

        throw new HTTPException(500, {message: "Unable to create a new account"})
    }
}