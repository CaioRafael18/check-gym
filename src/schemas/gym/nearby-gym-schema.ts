import z from 'zod'

export const nearbyGymsQuerySchema = z.object({
  latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
  longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
})

export const nearbyGymsSchema = {
  schema: {
    tags: ['gym'],
    summary: 'Busca uma academia próxima',
    querystring: nearbyGymsQuerySchema,
    response: {
      200: z.object({
        gyms: z.array(
          z.object({
            title: z.string(),
            description: z.string().nullable(),
            phone: z.string().nullable(),
            latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
            longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
            id: z.string(),
          }),
        ),
      }),
    },
  },
}
