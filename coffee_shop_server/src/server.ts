import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import authRoute from './routes/auth/auth.route.js'

const app = new Hono().basePath("/api/v1")

app.use(logger())

app.get('/ping', (c) => {
  return c.text('pong', 200)
})


app.route('/', authRoute)


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
