import { zValidator } from "@hono/zod-validator"
import {createFactory} from "hono/factory"
import {validator} from "hono/validator"
import { validateCookie } from "../../validation/auth/cookie.validation"
import { errorHandler } from "../../error/error"
import { refreshTokenService } from "../../service/auth/refresh.service"
import { getCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"
const factory = createFactory()

export const refreshHandler = factory.createHandlers(
   async(c)=>{
        try {

          const refreshCookie = getCookie(c, "refresh_token")
          if(!refreshCookie) throw new HTTPException(401, {message: "Invalid or Expired Refresh Token"})
          const message = await refreshTokenService(c, refreshCookie)
          return c.json(message, 200)
        } catch (error) {
             return errorHandler(c, error)
        }
       
   }
)