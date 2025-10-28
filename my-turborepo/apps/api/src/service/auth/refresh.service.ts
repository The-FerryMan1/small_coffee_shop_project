import { Context } from "hono";
import { decode, verify } from "hono/jwt";
import { db } from "../../database";
import { CredentialsTable, usersTable } from "../../database/schema";
import { eq } from "drizzle-orm";
import { generateToken } from "../../utils/tokenGenerator..util";
import { HTTPException } from "hono/http-exception";

export const refreshTokenService = async(c:Context, refresh_token:string)=>{
    try {
        const validToken = await verify(refresh_token, process.env.REFRESH_SECRET as string)
        const { sub, role } = validToken

        const roles = role as "customer" | "manager"|"admin"
        const success = await generateToken(c, {
            id: Number(sub),
            role: roles
        })
         if(!success) throw new HTTPException(500, {message: "Unexpected error occured during proccess, unable to create new token"})

            return {"message": "Token has been refreshed"}
    } catch (error) {


        if(error instanceof HTTPException){
            throw new HTTPException(error.status,  {message: error.message})
        }

        if(error instanceof Error){
            error.message = error.message.toLowerCase()
            if (error.message.includes("expired")) {
                 throw new HTTPException(401, {message:"Refresh token expired"})
            }
            if (error.message.includes("invalid")) {
                throw new HTTPException(401, {message:"Invalid refresh token"})
            }
           
        }
        console.log(error)
         throw new HTTPException(500, {message: "Unable to refresh token"})
    }
}