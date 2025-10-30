import { Context } from "hono"
import { deleteCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"

export const logoutService = async (c: Context) => {
    try {
        deleteCookie(c, "access_token")
        deleteCookie(c, "refresh_token")

        return {"message": "Log out successfully"}
    } catch (error) {
        console.log(error)
        if (error instanceof HTTPException) {
            throw new HTTPException(error.status, { message: error.message })
        }

        throw new HTTPException(500, { message: "Unable to log out" })
    }
}
