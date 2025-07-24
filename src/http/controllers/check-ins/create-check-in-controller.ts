import type { FastifyReply, FastifyRequest } from 'fastify'
import type z from 'zod'
import type {
  createCheckInBodySchema,
  createCheckInParamsSchema,
} from '@/schemas/check-ins/create-check-in-schema.ts'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use.case.ts'

export type CreateCheckInRequest = FastifyRequest<{
  Params: z.infer<typeof createCheckInParamsSchema>
  Body: z.infer<typeof createCheckInBodySchema>
}>

export async function createCheckInController(request: CreateCheckInRequest, reply: FastifyReply) {
  const { gymId } = request.params
  const { latitude, longitude } = request.body

  const checkInUseCase = makeCheckInUseCase()

  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
