import { Hono } from 'hono'
import {logger} from "hono/logger"
import authRoute from './routes/auth.route'
import { jwt, JwtVariables } from 'hono/jwt'
import {cors} from 'hono/cors'
import userRoute from './routes/user.route'
import { secureHeaders } from 'hono/secure-headers'
import { csrf } from 'hono/csrf'


interface Variable {
  JwtVariables: JwtVariables,
  sub: number
}
const app = new Hono<{Variables: Variable }>().basePath("/api/v1/")


app.use(logger())

app.use(cors({origin: ['http://localhost:5173'], credentials: true,  allowMethods: ['POST', 'GET', 'OPTIONS'],}))



app.use("/auth/*", jwt({
    secret: process.env.ACCESS_SECRET as string,
    cookie: "access_token"
  })
)
app.route('/', authRoute)
app.route("/", userRoute)

app.get("/auth/test", (c)=>{
  const jwt = c.get('jwtPayload')
  return c.json({"sub": jwt.sub},200)
})

export default {
  port: process.env.PORT,
  fetch: app.fetch
}
