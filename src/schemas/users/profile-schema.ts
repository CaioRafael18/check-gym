import z from 'zod/v4'
import { verifyJwt } from '@/middlewares/verify-jwt.ts'

export const profileSchema = {
  onRequest: verifyJwt,
  schema: {
    tags: ['users'],
    summary: 'Retorna dados do usuário logado',
    response: {
      200: z.object({
        user: z.object({
          email: z.string(),
          name: z.string(),
          id: z.string(),
          role: z.enum(['ADMIN', 'MEMBER']),
          passwordHash: z.string(),
          createdAt: z.date(),
        }),
      }),
    },
  },
}
