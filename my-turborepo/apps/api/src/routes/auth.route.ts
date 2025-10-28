import { Hono } from "hono"
import { registerHadlder } from "../handler/auth/register.handler"
import { loginHadlder } from "../handler/auth/login.handler"
import { refreshHandler } from "../handler/auth/refresh.handler"

const authRoute = new Hono()

authRoute.post("/register",  ...registerHadlder)
authRoute.post("/login",  ...loginHadlder)
authRoute.post("/refresh", ...refreshHandler)
export default authRoute
