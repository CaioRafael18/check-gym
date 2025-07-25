import type { CheckIn } from '@prisma/client'
import { MaxDistanceError } from '@/errors/max-distance-error.ts'
import { MaxNumberOfCheckInsError } from '@/errors/max-number-of-check-ins-error.ts'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error.ts'
import type { CheckInsRepository } from '@/repositories/check-ins-repository.ts'
import type { GymsRepository } from '@/repositories/gyms-repository.ts'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates.ts'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInsRepository.create({
      gymId,
      userId,
    })

    return {
      checkIn,
    }
  }
}
