import { getSignedCookie } from "hono/cookie"
import {createMiddleware} from "hono/factory"
import { HTTPException } from "hono/http-exception"
import { verify } from "hono/jwt"

export const verifyTokenMiddleware = createMiddleware(
    async(c, next)=>{
        try {
            const foundAceessCookie = await getSignedCookie(c, process.env.COOKIE_SECRET_TOKEN as string, "access_token")
            if(!foundAceessCookie) throw new HTTPException(403, {message:"Cookie not found"})
            
            const verifiedAccessToken = await verify(foundAceessCookie, process.env.ACCESS_SECRET_TOKEN as string )
            c.set("jwtPayload", verifiedAccessToken)
            await next()
        } catch (error) {
            if(error instanceof HTTPException){
                return c.json({"error": error.message}, error.status)
           }

           if (error instanceof Error){
                const errorMessage = error.message.toLowerCase()
                if(errorMessage.includes("invalid")){
                    console.log(errorMessage)
                    return c.json({"error": "Invalid token"}, 401)
                }
                if(errorMessage.includes("expired")){
                     return c.json({"error": "Token has expired"}, 401)
                }
           }

            return c.json({"error": "Internal service error"}, 500)
        }
            
    }
)