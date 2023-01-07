import { injectable, inject } from 'tsyringe'

import { IUsersRepository } from '@modules/users/repositories/user-repository'
import { ITokensRepository } from '@modules/users/repositories/token-repository'
import { LoginUserRequestDTO, LoginUserResponseDTO } from '@modules/users/dtos/login-user-dto'

import { AppError } from '@shared/errors/app-error'
import { IHashProvider } from '@shared/container/providers/hash-provider/models/IHashProvider'
import { ITokenProvider } from '@shared/container/providers/token-provider/models/ITokenProvider'

@injectable()
export class LoginService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('TokensRepository')
    private tokensRepository: ITokensRepository,
  ) {}

  async handle({ email, password }: LoginUserRequestDTO): Promise<LoginUserResponseDTO | null> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError('Email not found', '401')

    const passwordMatched = await this.hashProvider.compareHash(password, user.password)

    if (!passwordMatched) throw new AppError('Invalid password', '401')

    const jwtToken = this.tokenProvider.signToken(user.id)

    const { token } = await this.tokensRepository.create({ token: jwtToken, userId: user.id })

    return { user, token }
  }
}
