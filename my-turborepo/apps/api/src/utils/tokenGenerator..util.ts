import { Context } from "hono";
import { sign } from "hono/jwt"
import { setCookie } from "hono/cookie"
export const generateToken = async(c: Context, info: {
    id: number,
    email: string,
    role: "customer"|"manager"|"admin"
})=>{
    const ACCESS_TOKEN_EXPIRY = Math.floor(Date.now() / 1000) + 60 * 15
    const REFRESH_TOKEN_EXPIRY = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7

    try {
        const {email, id, role} = info

        const accces_token_payload = {
            id,
            email,
            role,
            exp: ACCESS_TOKEN_EXPIRY
        }

        const refresh_token_payload = {
            id,
            email,
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
            maxAge: new Date(ACCESS_TOKEN_EXPIRY).getMilliseconds()
        })

         setCookie(c, "refresh_token", signedRefreshToken, {
            ...commonCookieOption,
            maxAge: new Date(REFRESH_TOKEN_EXPIRY).getMilliseconds()
        })
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}