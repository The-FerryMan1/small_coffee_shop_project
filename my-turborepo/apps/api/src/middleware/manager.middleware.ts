import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

export const managerRoleCheck = createMiddleware(async(c,next)=>{
    const payload = c.get('jwtPayload')

    if(payload.role !== "manager") throw new HTTPException(403, {message:"You are not allowed to do this action"})
    await next()   
})