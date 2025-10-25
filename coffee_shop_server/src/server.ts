import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import authRoute from './routes/auth/auth.route.js'
import { HTTPException } from 'hono/http-exception'
import { verifyTokenMiddleware } from './middleware/auth/verifyToken.middleware.js'




const app = new Hono().basePath("/api/v1")
app.use(logger())

app.use("/auth/*", verifyTokenMiddleware),




app.get('/auth/ping', (c) => {
  const jwt = c.get('jwtPayload')
  return c.json(jwt, 200)
})


app.route('/', authRoute)



app.onError((err,c)=>{
  if (err instanceof HTTPException){
    return c.json({"error": err.message}, err.status)
  }

  return c.json({"error": err}, 500)
})
serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
