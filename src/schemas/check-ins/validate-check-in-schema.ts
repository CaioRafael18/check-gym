import z from 'zod'
import { verifyUserRole } from '@/middlewares/verify-user-role.ts'

export const validateCheckInParamsSchema = z.object({
  checkInId: z.uuid(),
})

export const validateCheckInSchema = {
  schema: {
    onRequest: [verifyUserRole('ADMIN')],
    tags: ['check-ins'],
    summary: 'Valida um check-in específico ',
    params: validateCheckInParamsSchema,
    response: {
      204: z.null(),
    },
  },
}
