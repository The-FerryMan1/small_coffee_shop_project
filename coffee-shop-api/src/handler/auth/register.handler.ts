import { createFactory} from "hono/factory"
import {zValidator} from "@hono/zod-validator"
import { registerValidator } from "../../validation/auth/register.validation"
import { registerService } from "../../service/auth/register.service"

const factory = createFactory()

export const registerHadlder = factory.createHandlers(
        zValidator("json", registerValidator),
        async(c)=>{
            const form = c.req.valid("json")
            const message = await registerService(form)
            return c.json(message, 200)
        }
)