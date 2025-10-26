import { Hono } from "hono"
import { registerHadlder } from "../handler/auth/register.handler"

const authRoute = new Hono()

authRoute.post("/register",  ...registerHadlder)

export default authRoute
