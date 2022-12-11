import { inject, injectable } from 'tsyringe'

import { FindByToken } from '@modules/users/dtos/find-user-by-token-dto'
import { ITokensRepository } from '@modules/users/repositories/token-repository'

@injectable()
export class FindUserService {
  constructor(
    @inject('TokensRepository')
    private tokensRepository: ITokensRepository
  ) {}

  async handle(token: string): Promise<FindByToken | undefined> {
    return await this.tokensRepository.findByToken(token)
  }
}
