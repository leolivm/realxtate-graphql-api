import { ITokenDTO } from '@modules/users/dtos/create-token-dto'
import { FindByToken } from '@modules/users/dtos/find-user-by-token-dto'
import { Tokens } from '@modules/users/infra/prisma/models/tokens'

export interface ITokensRepository {
  findByToken(token: string): Promise<FindByToken | undefined>
  create(data: ITokenDTO): Promise<Tokens>
}
