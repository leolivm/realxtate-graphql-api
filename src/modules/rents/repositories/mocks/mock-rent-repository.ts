import { v4 as uuid } from 'uuid'

import { IRentDTO } from '@modules/rents/dtos/create-rent-dto'
import { Rents } from '@modules/rents/infra/prisma/models/rents'
import { IRentRepository } from '@modules/rents/repositories/rent-repository'

export class MockRentsRepository implements IRentRepository {
  private rents: Rents[] = []

  public async create(data: IRentDTO): Promise<Rents> {
    const rent = new Rents()

    Object.assign(rent, { id: uuid(), data })

    this.rents.push(rent)

    return rent
  }

  public async findAll(): Promise<Rents[]> {
    return this.rents
  }
}
