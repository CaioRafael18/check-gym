import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '@/middlewares/verify-jwt.ts'
import { createCheckInSchema } from '@/schemas/check-ins/create-check-in-schema.ts'
import { historyCheckInSchema } from '@/schemas/check-ins/history-check-in-schema.ts'
import { metricsCheckInSchema } from '@/schemas/check-ins/metrics-check-in-schema.ts'
import { validateCheckInSchema } from '@/schemas/check-ins/validate-check-in-schema.ts'
import { createCheckInController } from './create-check-in-controller.ts'
import { historyCheckInController } from './history-check-in-controller.ts'
import { metricsCheckInController } from './metrics-check-in-controller.ts'
import { validateCheckInController } from './validate-check-in-controller.ts'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.withTypeProvider<ZodTypeProvider>()

  app.get('/check-ins/history', historyCheckInSchema, historyCheckInController)
  app.get('/check-ins/metrics', metricsCheckInSchema, metricsCheckInController)

  app.post('/gyms/:gymId/check-ins', createCheckInSchema, createCheckInController)

  app.patch('/check-ins/:checkInId/validate', validateCheckInSchema, validateCheckInController)
}
