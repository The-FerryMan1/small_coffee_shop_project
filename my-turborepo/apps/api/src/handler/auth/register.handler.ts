import { createFactory} from "hono/factory"
import {zValidator} from "@hono/zod-validator"
import { registerValidator } from "../../validation/auth/register.validation"
import { registerService } from "../../service/auth/register.service"
import { HTTPException } from "hono/http-exception"
import { errorHandler } from "../../error/error"

const factory = createFactory()

export const registerHadlder = factory.createHandlers(
        zValidator("json", registerValidator),
        async(c)=>{

            try {
                 const form = c.req.valid("json")
                const message = await registerService(form)
                return c.json(message, 200)
            } catch (error) {
               return errorHandler(c, error)
            }
           
        }
)