import { container } from 'tsyringe'

import { Rents } from '@modules/rents/infra/prisma/models/rents'
import { FindAllRentsService } from '@modules/rents/use-cases/find-all-rents.service'

export class FindAllRentsController {
  async handle(): Promise<Rents[]> {
    return await container.resolve(FindAllRentsService).handle()
  }
}
