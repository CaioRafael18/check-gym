import type { FastifyReply, FastifyRequest } from 'fastify'
import type { z } from 'zod'
import type { historyCheckInQuerySchema } from '@/schemas/check-ins/history-check-in-schema.ts'
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case.ts'

export type HistoryCheckInRequest = FastifyRequest<{
  Querystring: z.infer<typeof historyCheckInQuerySchema>
}>

export async function historyCheckInController(
  request: HistoryCheckInRequest,
  reply: FastifyReply,
) {
  const { page } = request.query

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkIns,
  })
}
