import z from 'zod/v4'

export const refreshTokenSchema = {
  schema: {
    tags: ['users'],
    summary: 'Cria um novo access token',
    response: {
      200: z.object({
        token: z.string(),
      }),
    },
  },
}
