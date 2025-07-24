import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '@/lib/prisma.ts'

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
  await prisma.user.create({
    data: {
      name: 'teste',
      email: 'teste@example.com',
      passwordHash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'teste@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
