import { createFactory } from "hono/factory";
import { db } from "../../database/index.js";
import { validator } from "hono/validator";
import { loginValidator } from "../../validation/auth/login.validator.js";
import { HTTPException } from "hono/http-exception";
import z from "zod";
import { CredentialsTable, usersTable } from "../../database/schema.js";
import { eq } from "drizzle-orm";
import { passwordVerify } from "../../utils/password.util.js";
import { generateTokens } from "../../utils/generateToken.util.js";


const factory = createFactory()
const database = db

export const loginService = factory.createHandlers(
    validator("json", (value, c)=>{
        const parsed = loginValidator.safeParse(value)
        if(!parsed.success) throw new HTTPException(400, {
            message: JSON.stringify(z.treeifyError(parsed.error))
        })
        return parsed.data
    }), 
    async(c)=>{

        try {
            const credentials = c.req.valid("json")
            const [founduser] = await database.select({
                    id: usersTable.id,
                    email: usersTable.email,
                    role: CredentialsTable.role,
                    hashedPassword: CredentialsTable.hashedPassword
            })
            .from(usersTable)
            .innerJoin(CredentialsTable, eq(usersTable.id, CredentialsTable.userID))
            .where(eq(usersTable.email, credentials.email))
            .limit(1)

            if(!founduser) throw new HTTPException(401, {message: "Inavalid email or password"})
            
            const matched = await passwordVerify(credentials.password, founduser.hashedPassword)
            if(!matched) throw new HTTPException(401, {message: "Invalid email or password"})

            const {id,email,role} = founduser
            if(!role) throw new HTTPException(401, {message: "Account has no role, generating a token has failed"})


            await generateTokens(c, {id, email, role})
            return c.json({message: "Login successfully"}, 200)

        } catch (error) {
            if(error instanceof HTTPException){
                return c.json({"error": error.message}, error.status)
            }
            return c.json({"error": "Internal service error"}, 500)
        }
            
        
    }
)

