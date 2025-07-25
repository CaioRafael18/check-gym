import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app.ts'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user.ts'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'teste@example.com',
      }),
    )
  })
})
