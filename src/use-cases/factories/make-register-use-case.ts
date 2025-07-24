import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.ts'
import { RegisterUseCase } from '../register-use-case.ts'

export function MakeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new RegisterUseCase(usersRepository)
  return useCase
}
