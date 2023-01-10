import { container } from 'tsyringe'

import { Rents } from '@modules/rents/infra/prisma/models/rents'
import { FindAllRents } from '@modules/rents/use-cases/find-all-rents.service'

export class FindAllRentsController {
  async handle(): Promise<Rents[]> {
    return await container.resolve(FindAllRents).handle()
  }
}
