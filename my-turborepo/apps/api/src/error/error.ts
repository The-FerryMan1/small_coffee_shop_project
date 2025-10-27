import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
export const errorHandler = (c: Context, error:unknown)=>{
    if(error instanceof HTTPException){
        console.error(error.message)
        return c.json({"error": error.message}, error.status)
    }
    return c.json({"error": "Internal service error"})
}