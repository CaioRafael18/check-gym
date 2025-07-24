import type { FastifyReply, FastifyRequest } from 'fastify'
import type z from 'zod'
import type { nearbyGymsQuerySchema } from '@/schemas/gym/nearby-gym-schema.ts'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case.ts'

export type NearbyGymsQueryRequest = FastifyRequest<{
  Querystring: z.infer<typeof nearbyGymsQuerySchema>
}>

export async function nearbyController(request: NearbyGymsQueryRequest, reply: FastifyReply) {
  const { latitude, longitude } = request.query

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ gyms })
}
