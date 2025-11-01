import {createFactory} from "hono/factory"
import { errorHandler } from "../../error/error"
import { getaUSerService } from "../../service/user/get.service"

const factory = createFactory()

export const getUserHandler = factory.createHandlers(async(c)=>{
    try {
       const user =  await getaUSerService(c)
        return c.json(user, 200)
    } catch (error) {
        return errorHandler(c, error)
    }
})