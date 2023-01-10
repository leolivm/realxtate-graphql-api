import { inject, injectable } from 'tsyringe'

import { FindByToken } from '@modules/users/dtos/find-user-by-token-dto'
import { ITokensRepository } from '@modules/users/repositories/token-repository'
import { AppError } from '@shared/errors/app-error'

@injectable()
export class FindUserService {
  constructor(
    @inject('TokensRepository')
    private tokensRepository: ITokensRepository
  ) {}

  async handle(token: string): Promise<FindByToken | undefined> {
    const tokenFound = await this.tokensRepository.findByToken(token)

    if (tokenFound) return tokenFound

    throw new AppError('Token not found.', '401')
  }
}
