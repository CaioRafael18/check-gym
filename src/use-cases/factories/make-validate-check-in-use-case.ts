import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository.ts'
import { ValidateCheckInUseCase } from '../validate-check-in-use-case.ts'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
