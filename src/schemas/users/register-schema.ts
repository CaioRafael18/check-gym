import z from 'zod'

export const registerBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
})

export const registerSchema = {
  schema: {
    tags: ['users'],
    summary: 'Cadastra um usuário no sistema',
    body: registerBodySchema,
    response: {
      201: z.null(),
      409: z.object({
        message: z.string(),
      }),
    },
  },
}
