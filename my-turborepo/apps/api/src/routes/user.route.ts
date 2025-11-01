import {Hono} from "hono"
import { getUserHandler } from "../handler/user/get.handler"

const userRoute = new Hono()

userRoute.get('/auth/user', ...getUserHandler)

export default userRoute 

