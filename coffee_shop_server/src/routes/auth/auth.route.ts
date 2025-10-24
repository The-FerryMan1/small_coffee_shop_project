import { Hono } from "hono";
import { registerService } from "../../services/auth/register.service.js";

const authRoute = new Hono()

authRoute.post("/register", ...registerService )

export default authRoute