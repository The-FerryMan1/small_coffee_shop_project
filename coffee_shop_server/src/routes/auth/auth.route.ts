import { Hono} from "hono";
import { registerService } from "../../services/auth/register.service.js";
import { loginService } from "../../services/auth/login.service.js";
import { HTTPException } from "hono/http-exception";
const authRoute = new Hono()

authRoute.post("/register", ...registerService )
authRoute.post("/login", ...loginService)


export default authRoute