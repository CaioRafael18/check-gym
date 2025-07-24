import type { FastifyReply, FastifyRequest } from 'fastify'
import type z from 'zod'
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error.ts'
import type { registerBodySchema } from '@/schemas/users/register-schema.ts'
import { MakeRegisterUseCase } from '@/use-cases/factories/make-register-use-case.ts'

export type RegisterRequest = FastifyRequest<{
  Body: z.infer<typeof registerBodySchema>
}>

export async function registerController(request: RegisterRequest, reply: FastifyReply) {
  const { name, email, password } = request.body

  try {
    const registerUseCase = MakeRegisterUseCase()
    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
