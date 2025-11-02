import { Context } from "hono";
import { db } from "../../database";
import { CredentialsTable, usersTable } from "../../database/schema";
import { eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";

export const getaUSerService = async(c: Context)=>{
    try{
       const {sub} = c.get("jwtPayload")

       const [found] = await db.select({id: usersTable.id, firstName: usersTable.firstName, lastName: usersTable.lastName, role: CredentialsTable.role, email:usersTable.email}).from(usersTable).innerJoin(CredentialsTable, eq(CredentialsTable.userID, sub)).where(eq(usersTable.id, sub))
       if(!found) throw new HTTPException(404, {message:"User not found"})

        return found
    }catch(error){
        if(error instanceof HTTPException){
            throw new HTTPException(error.status, {message: error.message})
        }

        throw new HTTPException(500, {message: "Internal service error"})
    }
}