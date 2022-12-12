import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/app-error'
import { IHashProvider } from '@shared/container/providers/hash-provider/models/IHashProvider'

import { IUserDTO } from '@modules/users/dtos/create-user-dto'
import { User } from '@modules/users/infra/prisma/models/user'
import { IUsersRepository } from '@modules/users/repositories/user-repository'

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

    if (emailExists) throw new AppError('Email already used', '400')

    return this.usersRepository.create({ name, email, password: hashedPassword })
  }
}
