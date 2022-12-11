import { container } from 'tsyringe'

import { FindByToken } from '@modules/users/dtos/find-user-by-token-dto'
import { FindUserService } from '@modules/users/use-cases/find-user.service'

export class FindUserController {
  async handle(token: string): Promise<FindByToken | undefined> {
    return await container.resolve(FindUserService).handle(token)
  }
}
