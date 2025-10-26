import { zValidator } from "@hono/zod-validator"
import { createFactory} from "hono/factory"
import { loginValidator } from "../../validation/auth/login.validation"
import { errorHandler } from "../../error/error"
import { loginService } from "../../service/auth/login.service"


const factory = createFactory()

export const loginHadlder = factory.createHandlers(
    zValidator("json", loginValidator),
    async(c)=>{
        try {
            const credentials = c.req.valid("json")
            const message = await loginService(c, credentials)
            return c.json(message, 200)
        } catch (error) {
            return errorHandler(c, error)
        }
    }
)