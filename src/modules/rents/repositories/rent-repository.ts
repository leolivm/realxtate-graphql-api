import { IRentDTO } from '@modules/rents/dtos/create-rent-dto'
import { Rents } from '@modules/rents/infra/prisma/models/rents'

export interface IRentRepository {
  create(data: IRentDTO): Promise<Rents>
  findAll(): Promise<Rents[]>
}
