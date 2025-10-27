import { zValidator } from "@hono/zod-validator"
import {createFactory} from "hono/factory"
import {validator} from "hono/validator"
import { validateCookie } from "../../validation/auth/cookie.validation"
import { errorHandler } from "../../error/error"
import { refreshTokenService } from "../../service/auth/refresh.service"
const factory = createFactory()

export const refreshHandler = factory.createHandlers(
   zValidator("cookie", validateCookie),
   async(c)=>{
        try {
            const refresh = c.req.valid("cookie")
            const message = await refreshTokenService(c,refresh.refresh_token)
            return c.json(message, 200)
        } catch (error) {
             return errorHandler(c, error)
        }
       
   }
)