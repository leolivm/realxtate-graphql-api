import { v4 as uuid } from 'uuid'

import { ITokenDTO } from '@modules/users/dtos/create-token-dto'
import { Tokens } from '@modules/users/infra/prisma/models/tokens'
import { FindByToken } from '@modules/users/dtos/find-user-by-token-dto'
import { ITokensRepository } from '@modules/users/repositories/token-repository'
import { AppError } from '@shared/errors/app-error'

export class MockTokenRepository implements ITokensRepository {
  private tokens: Tokens[] = []

  public async create(data: ITokenDTO): Promise<Tokens> {
    const token = new Tokens()

    Object.assign(token, { id: uuid(), userId: data.userId })

    this.tokens.push(token)

    return token
  }

  public async findByToken(token: string): Promise<FindByToken | undefined> {
    const userId = this.tokens.find((tokenFound) => tokenFound.token === token)?.userId

    if (userId) {
      return {
        id: userId,
        name: 'John Doe',
        email: 'johndoe@example.com',
      }
    }

    throw new AppError('Token not found.', '401')
  }
}
