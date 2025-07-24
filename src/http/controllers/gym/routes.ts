import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '@/middlewares/verify-jwt.ts'
import { createGymSchema } from '@/schemas/gym/create-gym-schema.ts'
import { nearbyGymsSchema } from '@/schemas/gym/nearby-gym-schema.ts'
import { searchGymsQuerySchema } from '@/schemas/gym/search-gym-schema.ts'
import { createController } from './create-gym-controller.ts'
import { nearbyController } from './nearby-gym-controller.ts'
import { searchController } from './search-gym-controller.ts'

export async function gymsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/search', searchGymsQuerySchema, searchController)
  app.get('/gyms/nearby', nearbyGymsSchema, nearbyController)

  app.post('/gyms', createGymSchema, createController)
}
