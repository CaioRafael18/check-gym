import { app } from './app.ts'
import { env } from './env.ts'

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 Server is running on port 3333')
  })
