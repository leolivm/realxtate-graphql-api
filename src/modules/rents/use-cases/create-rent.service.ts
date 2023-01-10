import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/app-error'

import { IRentDataDTO } from '@modules/rents/dtos/create-rent-dto'
import { Rents } from '@modules/rents/infra/prisma/models/rents'
import { IRentRepository } from '@modules/rents/repositories/rent-repository'

import { ITokensRepository } from '@modules/users/repositories/token-repository'

@injectable()
export class CreateRentService {
  constructor(
    @inject('TokensRepository')
    private tokensRepository: ITokensRepository,

    @inject('RentsRepository')
    private rentsRepository: IRentRepository
  ) {}

  async handle(data: IRentDataDTO): Promise<Rents | null> {
    const userFound = await this.tokensRepository.findByToken(data.token)

    if (!userFound) throw new AppError('User not found.', '401')

    const payload = {
      rent: data.rent,
      title: data.title,
      contact: data.contact,
      bedrooms: data.bedrooms,
      currency: data.currency,
      latitude: data.latitude,
      location: data.location,
      bathrooms: data.bathrooms,
      image_url: data.image_url,
      longitude: data.longitude,
      description: data.description,
      monthly_cost: data.monthly_cost,
      square_feets: data.square_feets,
      userId: userFound.id,
    }

    return this.rentsRepository.create(payload)
  }
}
