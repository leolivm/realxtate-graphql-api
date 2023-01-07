import 'reflect-metadata'

import { LoginService } from '@modules/users/use-cases/login.service'
import { FindUserService } from '@modules/users/use-cases/find-user.service'
import { CreateUserService } from '@modules/users/use-cases/create-user.service'
import { MockUserRepository } from '@modules/users/repositories/mocks/mock-user-repository'
import { MockTokenRepository } from '@modules/users/repositories/mocks/mock-token-repository'
import { MockTokenProvider } from '@shared/container/providers/token-provider/mocks/mock-token-provider'

import { MockHashProvider } from '@shared/container/providers/hash-provider/mocks/mock-hash-provider'

let mockUserRepository: MockUserRepository
let mockHashProvider: MockHashProvider
let mockTokenRepository: MockTokenRepository
let mockTokenProvider: MockTokenProvider
let findUserService: FindUserService
let createUserService: CreateUserService
let loginService: LoginService

describe('Find user', () => {
  beforeEach(() => {
    mockHashProvider = new MockHashProvider()
    mockTokenProvider = new MockTokenProvider()
    mockUserRepository = new MockUserRepository()
    mockTokenRepository = new MockTokenRepository()
    createUserService = new CreateUserService(mockHashProvider, mockUserRepository)
    findUserService = new FindUserService(mockTokenRepository)
    loginService = new LoginService(
      mockHashProvider,
      mockUserRepository,
      mockTokenProvider,
      mockTokenRepository,
    )
  })

  it('should be able to find user by token', async () => {
    const user = await createUserService.handle({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const authenticate = await loginService.handle({
      email: user!.email,
      password: user!.password,
    })

    const findUser = await findUserService.handle(authenticate!.token)

    const id = authenticate?.user.id === findUser?.id

    expect(id).toBeTruthy()
  })
})
