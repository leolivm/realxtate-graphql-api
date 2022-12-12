import { v4 as uuid } from 'uuid'

import { IUserDTO } from '@modules/users/dtos/create-user-dto'
import { User } from '@modules/users/infra/prisma/models/user'
import { IUsersRepository } from '@modules/users/repositories/user-repository'

export class FakeUserRepository implements IUsersRepository {
  private users: User[] = []

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email)
  }

  public async create(data: IUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: uuid(), data })

    this.users.push(user)

    return user
  }
}
