import type { FastifyReply, FastifyRequest } from 'fastify'
import type z from 'zod'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error.ts'
import type { authenticateRequest } from '@/schemas/users/authenticate-schema.ts'
import { MakeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case.ts'

export type AuthenticateRequest = FastifyRequest<{
  Body: z.infer<typeof authenticateRequest>
}>

export async function authenticateController(request: AuthenticateRequest, reply: FastifyReply) {
  const { email, password } = request.body

  try {
    const authenticateUseCase = MakeAuthenticateUseCase()
    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/', // cookie available in all routes
        secure: true, // if you are using https for criptography
        sameSite: true, // only same site
        httpOnly: true, // only server can access cookie
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
