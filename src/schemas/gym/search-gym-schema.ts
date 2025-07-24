import z from 'zod'

export const searchGymsQuerySchemaZod = z.object({
  q: z.string(),
  page: z.coerce.number().min(1).default(1),
})

export const searchGymsQuerySchema = {
  schema: {
    tags: ['gym'],
    summary: 'Exibe uma lista de academias',
    querystring: searchGymsQuerySchemaZod,
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
