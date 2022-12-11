import { container } from 'tsyringe'

import { User } from '@modules/users/infra/prisma/models/user'
import { CreateUserService } from '@modules/users/use-cases/create-user.service'
import { IUserDTO } from '@modules/users/dtos/create-user-dto'

export class SignUpController {
  async handle(data: IUserDTO): Promise<User | null> {
    return await container.resolve(CreateUserService).handle(data)
  }
}
