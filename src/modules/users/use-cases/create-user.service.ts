import { inject, injectable } from 'tsyringe'

import { IUserDTO } from '../dtos/create-user-dto'
import { User } from '@modules/users/infra/prisma/models/user'
import { IUsersRepository } from '@modules/users/repositories/user-repository'
import { IHashProvider } from '@shared/container/providers/hash-provider/models/IHashProvider'

@injectable()
export class CreateUserService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async handle(data: IUserDTO): Promise<User | null> {
    const { email, password, name } = data

    const hashedPassword = await this.hashProvider.generateHash(password)

    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) throw new Error('Email already used')

    return this.usersRepository.create({ name, email, password: hashedPassword })
  }
}
