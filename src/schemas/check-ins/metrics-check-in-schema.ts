import z from 'zod'

export const metricsCheckInSchema = {
  schema: {
    tags: ['check-ins'],
    summary: 'Retorna a quantidade de check-ins do usuário logado',
    response: {
      200: z.object({
        checkInsCount: z.number(),
      }),
    },
  },
}
