import type { FastifyReply, FastifyRequest } from 'fastify'
import type { z } from 'zod'
import type { validateCheckInParamsSchema } from '@/schemas/check-ins/validate-check-in-schema.ts'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case.ts'

export type ValidateCheckInRequest = FastifyRequest<{
  Params: z.infer<typeof validateCheckInParamsSchema>
}>

export async function validateCheckInController(request: ValidateCheckInRequest, reply: FastifyReply) {
  const { checkInId } = request.params

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
