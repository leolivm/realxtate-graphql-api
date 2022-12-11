import { PrismaClient } from '@prisma/client'
import { context } from '@shared/infra/context'

import { User } from '@modules/users/infra/prisma/models/user'
import { IUserDTO } from '@modules/users/dtos/create-user-dto'
import { IUsersRepository } from '@modules/users/repositories/user-repository'

export class UsersRepository implements IUsersRepository {
  constructor(private prisma: PrismaClient = context.prisma) {}

  public async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.users.findUnique({
      where: { email },
    })
  }

  public async create(data: IUserDTO): Promise<User> {
    return this.prisma.users.create({ data })
  }
}
