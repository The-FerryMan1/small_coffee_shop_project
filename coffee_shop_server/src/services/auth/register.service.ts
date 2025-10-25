import { createFactory } from "hono/factory";
import { validator } from "hono/validator";
import { registerValidator } from "../../validation/auth/register.validator.js";
import z from "zod";
import { db } from "../../database/index.js";
import {hashPassword} from './../../utils/password.util.js'
import { CredentialsTable, usersTable } from "../../database/schema.js";
import { eq } from "drizzle-orm";

const factory = createFactory()
const database = db
export const registerService = factory.createHandlers(
    validator("json", (value, c)=>{
    const parsed = registerValidator.safeParse(value)
    if (!parsed.success) return c.json({"error": z.treeifyError(parsed.error)}, 400)
    return parsed.data
}), 
async(c:any)=>{
    try {
        const {first_name, last_name, middle_name, email, password } = c.req.valid("json")
        const found = await database.$count(usersTable, eq(usersTable.email, email))
        
        if(found > 0) return c.json({"error": "Email is already taken"}, 402)

        await database.transaction(async(tx)=>{
            const [newUser] = await tx.insert(usersTable).values({
                firstName: first_name,
                lastName:last_name,
                middleName: middle_name,
                email, 
            }).returning({id: usersTable.id})

            const passwordHash = await hashPassword(password)

            await tx.insert(CredentialsTable).values({
                userID: newUser.id, 
                hashedPassword: passwordHash
            })
        })
        return c.json({"message": "Account created successfully"}, 200)
    } catch (error) {
        console.error('Failed to register user:', error);
        return c.json({"error": "An error occurred, and a new user cannot be registered."})
    }
})