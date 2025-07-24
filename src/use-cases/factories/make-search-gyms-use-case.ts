import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.ts'
import { SearchGymsUseCase } from '../search-gyms-use-case.ts'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}
