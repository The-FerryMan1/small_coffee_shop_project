import { Context } from "hono";
import { sign } from "hono/jwt"
import { setCookie } from "hono/cookie"


type roles = "customer"|"manager"|"admin"
export const generateToken = async(c: Context, info: {
    id: number,
    role: roles
})=>{

    const now = Math.floor(Date.now() / 1000)
    const ACCESS_TOKEN_EXPIRY =  now + 60 
    const REFRESH_TOKEN_EXPIRY = now + 60 * 60 * 24 * 7

    try {
        const {id, role} = info

        const accces_token_payload = {
            sub:id,
            iat: now,  
            role,
            exp: ACCESS_TOKEN_EXPIRY
        }

        const refresh_token_payload = {
            sub:id,
            iat: now,
            role,
            exp: REFRESH_TOKEN_EXPIRY
        }

        const signedAccessToken = await sign(accces_token_payload, process.env.ACCESS_SECRET as string)
        const signedRefreshToken = await sign(refresh_token_payload, process.env.REFRESH_SECRET as string)

        const commonCookieOption = {
            path: '/',
            secure: process.env.STATUS as string === "production",
            httpOnly: true,
            sameSite: "Lax" as const,
        }

        setCookie(c, "access_token", signedAccessToken, {
            ...commonCookieOption,
            maxAge: 1000,
            expires: new Date(Date.now() + 60 * 60 * 24 * 7) 
        })

         setCookie(c, "refresh_token", signedRefreshToken, {
            ...commonCookieOption,
            maxAge: 1000,
            expires: new Date(Date.now() + 60 * 60 * 24 * 7) 
        })
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}