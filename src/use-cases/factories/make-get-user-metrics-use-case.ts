import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository.ts'
import { GetUserMetricsUseCase } from '../get-user-metrics-use-case.ts'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
