import type { FastifyReply, FastifyRequest } from 'fastify'
import type z from 'zod'
import type { createGymBodySchema } from '@/schemas/gym/create-gym-schema.ts'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case.ts'

export type CreateGymRequest = FastifyRequest<{
  Body: z.infer<typeof createGymBodySchema>
}>

export async function createController(request: CreateGymRequest, reply: FastifyReply) {
  const { title, description, phone, latitude, longitude } = request.body

  const createGymUseCase = makeCreateGymUseCase()

  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
