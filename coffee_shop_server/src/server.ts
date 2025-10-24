import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'


const app = new Hono()

app.use(logger())

app.get('/ping', (c) => {
  return c.text('pong', 200)
})





serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
