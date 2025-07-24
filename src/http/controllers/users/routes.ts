import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { authenticateSchema } from '@/schemas/users/authenticate-schema.ts'
import { profileSchema } from '@/schemas/users/profile-schema.ts'
import { refreshTokenSchema } from '@/schemas/users/refresh-token-schema.ts'
import { registerSchema } from '@/schemas/users/register-schema.ts'
import { authenticateController } from './authenticate-controller.ts'
import { profileController } from './profile-controller.ts'
import { refreshController } from './refresh-token-controller.ts'
import { registerController } from './register-controller.ts'

export async function usersRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
  app.post('/users', registerSchema, registerController)
  app.post('/sessions', authenticateSchema, authenticateController)
  app.patch('/token/refresh', refreshTokenSchema, refreshController)

  /** Routes Authenticated */
  app.get('/me', profileSchema, profileController)
}
