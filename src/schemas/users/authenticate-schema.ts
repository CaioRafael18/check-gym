import z from 'zod/v4'

export const authenticateRequest = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export const authenticateSchema = {
  schema: {
    tags: ['users'],
    summary: 'Autenticando usuário',
    body: authenticateRequest,
    response: {
      200: z.object({
        token: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
    },
  },
}
