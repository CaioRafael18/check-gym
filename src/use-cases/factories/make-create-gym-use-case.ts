import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.ts'
import { CreateGymUseCase } from '../create-gym-use-case.ts'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
