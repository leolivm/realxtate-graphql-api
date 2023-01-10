import { inject, injectable } from 'tsyringe'

import { Rents } from '@modules/rents/infra/prisma/models/rents'
import { IRentRepository } from '@modules/rents/repositories/rent-repository'

@injectable()
export class FindAllRentsService {
  constructor(
    @inject('RentsRepository')
    private rentsRepository: IRentRepository
  ) {}

  async handle(): Promise<Rents[]> {
    return await this.rentsRepository.findAll()
  }
}
