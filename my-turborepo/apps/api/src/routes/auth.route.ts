import { Hono } from "hono"
import { registerHadlder } from "../handler/auth/register.handler"
import { loginHandder } from "../handler/auth/login.handler"
import { refreshHandler } from "../handler/auth/refresh.handler"
import { logoutHanlder } from "../handler/auth/logout.handler"

const authRoute = new Hono()

authRoute.post("/register",  ...registerHadlder)
authRoute.post("/login",  ...loginHandder)
authRoute.post("/refresh", ...refreshHandler)
authRoute.post("/auth/logout", ...logoutHanlder)
export default authRoute
