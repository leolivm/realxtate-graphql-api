import { PrismaClient } from '@prisma/client'
import { context } from '@shared/infra/context'

import { Rents } from '@modules/rents/infra/prisma/models/rents'
import { IRentRepository } from '@modules/rents/repositories/rent-repository'
import { IRentDTO } from '@modules/rents/dtos/create-rent-dto'

export class RentsRepository implements IRentRepository {
  constructor(private prisma: PrismaClient = context.prisma) {}

  public async create(data: IRentDTO): Promise<Rents> {
    return this.prisma.rents.create({ data })
  }
}
