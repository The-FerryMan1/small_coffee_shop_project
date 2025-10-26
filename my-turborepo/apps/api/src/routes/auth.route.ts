import { Hono } from "hono"
import { registerHadlder } from "../handler/auth/register.handler"
import { loginHadlder } from "../handler/auth/login.handler"

const authRoute = new Hono()

authRoute.post("/register",  ...registerHadlder)
authRoute.post("/login",  ...loginHadlder)
export default authRoute
