import z from 'zod'
import { verifyUserRole } from '@/middlewares/verify-user-role.ts'

export const createGymBodySchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  phone: z.string().nullable(),
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

export const createGymSchema = {
  schema: {
    onRequest: [verifyUserRole('ADMIN')],
    tags: ['gym'],
    summary: 'Cria uma academia',
    body: createGymBodySchema,
    response: {
      201: z.null(),
    },
  },
}
