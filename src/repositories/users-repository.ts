import type { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findById(Id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
