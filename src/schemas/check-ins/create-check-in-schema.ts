import z from 'zod'

export const createCheckInParamsSchema = z.object({
  gymId: z.uuid(),
})

export const createCheckInBodySchema = z.object({
  latitude: z.number().refine((value) => Math.abs(value) <= 90),
  longitude: z.number().refine((value) => Math.abs(value) <= 180),
})

export const createCheckInSchema = {
  schema: {
    tags: ['check-ins'],
    summary: 'Realiza check-in do usuário em uma academia',
    params: createCheckInParamsSchema,
    body: createCheckInBodySchema,
    response: {
      201: z.null(),
    },
  },
}
