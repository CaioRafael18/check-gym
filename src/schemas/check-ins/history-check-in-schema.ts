import z from 'zod'

export const historyCheckInQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
})

export const historyCheckInSchema = {
  schema: {
    tags: ['check-ins'],
    summary: 'Lista o histórico de check-ins do usuário logado',
    querystring: historyCheckInQuerySchema,
    response: {
      200: z.object({
        checkIns: z.array(
          z.object({
            id: z.uuid(),
            gymId: z.uuid(),
            userId: z.uuid(),
            validatedAt: z.date().nullable(),
            createdAt: z.date(),
          }),
        ),
      }),
    },
  },
}
