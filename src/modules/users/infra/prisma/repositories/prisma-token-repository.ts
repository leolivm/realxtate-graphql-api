import { PrismaClient } from '@prisma/client'
import { context } from '@shared/infra/context'

import { ITokenDTO } from '@modules/users/dtos/create-token-dto'
import { Tokens } from '@modules/users/infra/prisma/models/tokens'
import { FindByToken } from '@modules/users/dtos/find-user-by-token-dto'
import { ITokensRepository } from '@modules/users/repositories/token-repository'

export class TokensRepository implements ITokensRepository {
  constructor(private prisma: PrismaClient = context.prisma) {}

  public async findByToken(token: string): Promise<FindByToken | undefined> {
    const tokenFound = await this.prisma.tokens.findUnique({
      where: { token },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return tokenFound?.user
  }

  public async create(data: ITokenDTO): Promise<Tokens> {
    return await this.prisma.tokens.create({
      data: { token: data.token, user: { connect: { id: data.userId } } },
    })
  }
}
