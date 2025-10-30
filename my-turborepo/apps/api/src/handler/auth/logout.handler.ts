import {createFactory} from "hono/factory"
import { errorHandler } from "../../error/error"
import { logoutService } from "../../service/auth/logout.service"

const factory = createFactory()

export const logoutHanlder = factory.createHandlers(async(c)=>{
    try {
       const message = await logoutService(c)
         return c.json(message, 200)
    } catch (error) {
        return errorHandler(c,error)
    }
})