import { PrismaClient } from '@prisma/client'
import { context } from '@shared/infra/context'

import { Rents } from '@modules/rents/infra/prisma/models/rents'
import { IRentDTO } from '@modules/rents/dtos/create-rent-dto'
import { IRentRepository } from '@modules/rents/repositories/rent-repository'

export class RentsRepository implements IRentRepository {
  constructor(private prisma: PrismaClient = context.prisma) {}

  public async create(data: IRentDTO): Promise<Rents> {
    return this.prisma.rents.create({ data })
  }

  public async findAll(): Promise<Rents[]> {
    return await this.prisma.rents.findMany()
  }
}
