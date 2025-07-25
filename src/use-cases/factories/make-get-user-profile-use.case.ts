import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.ts'
import { GetUserProfileUseCase } from '../get-user-profile-use-case.ts'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
