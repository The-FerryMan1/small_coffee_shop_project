import type { Context } from "hono"
import {createFactory} from "hono/factory"

const factory = createFactory()

export const verifyService = factory.createHandlers(
    async(c: Context)=>{
        const {id:user_id} = await c.get('jwtPayload');
    }
)