import type { FastifyReply, FastifyRequest } from 'fastify'
import type z from 'zod'
import type { searchGymsQuerySchemaZod } from '@/schemas/gym/search-gym-schema.ts'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case.ts'

export type SearchGymsQueryRequest = FastifyRequest<{
  Querystring: z.infer<typeof searchGymsQuerySchemaZod>
}>

export async function searchController(request: SearchGymsQueryRequest, reply: FastifyReply) {
  const { q, page } = request.query

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
