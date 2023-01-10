import { container } from 'tsyringe'

import { Rents } from '@modules/rents/infra/prisma/models/rents'
import { IRentDataDTO } from '@modules/rents/dtos/create-rent-dto'
import { CreateRentService } from '@modules/rents/use-cases/create-rent.service'

export class CreateRentController {
  async handle(data: IRentDataDTO): Promise<Rents | null> {
    return await container.resolve(CreateRentService).handle(data)
  }
}
