import { Hono } from 'hono'
import {logger} from "hono/logger"
import authRoute from './routes/auth.route'
const app = new Hono().basePath("/api/v1/")


app.use(logger())

app.route('/', authRoute)

export default {
  fetch: app.fetch
}
