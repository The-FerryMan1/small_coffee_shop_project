import type { Context } from "hono";
import { setSignedCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";

type UserRoles = "customer"|"manager"|"admin"

export const generateTokens = async(c:Context, credentials:{email: string, id: number, role:UserRoles})=>{
    try {
        const access_token_expiry = 60 * 15
        const refresh_token_expiry = 60 * 60 * 24 * 7

        const accessToken = {
            id: credentials.id,
            email: credentials.email,
            role: credentials.role,
            exp: Math.floor(Date.now() / 1000) + access_token_expiry 
        }

        const refreshToken = {
            email: credentials.email,
            exp: Math.floor(Date.now() / 1000) + refresh_token_expiry
        }

        const signedAccessToken = await sign(accessToken, process.env.ACCESS_SECRET_TOKEN as string) 
        const signedRefreshToken = await sign(refreshToken, process.env.REFRESH_SECRET_TOKEN as string)

        const commonCookieOption = {
            path: '/',
            secure: process.env.STATUS as string === "dev",
            httpOnly: true,
            sameSite: "Lax" as const,
        }

        await setSignedCookie(c, "access_token", signedAccessToken, process.env.COOKIE_SECRET_TOKEN as string, {
            ...commonCookieOption,
            maxAge: access_token_expiry
        })
        await setSignedCookie(c, "refresh_token", signedRefreshToken, process.env.COOKIE_SECRET_TOKEN as string, {
            ...commonCookieOption,
            maxAge: refresh_token_expiry
        })
    } catch (error) {
        throw new HTTPException(500, {message: "Unable to generate token"})    
    } 
}