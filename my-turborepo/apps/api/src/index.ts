import { Hono } from 'hono'
import {logger} from "hono/logger"
import authRoute from './routes/auth.route'
import { jwt } from 'hono/jwt'
const app = new Hono().basePath("/api/v1/")


app.use(logger())
app.use("/auth/*", 
  jwt({
    secret: process.env.ACCESS_SECRET as string,
    cookie: "access_token"
  })
)
app.route('/', authRoute)

app.get("/auth/test", (c)=>{
  const jwt = c.get('jwtPayload')
  return c.json(jwt, 200)
})

export default {
  port: process.env.PORT,
  fetch: app.fetch
}
