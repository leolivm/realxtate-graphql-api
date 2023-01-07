import 'reflect-metadata'

import { LoginService } from '@modules/users/use-cases/login.service'
import { CreateUserService } from '@modules/users/use-cases/create-user.service'
import { MockUserRepository } from '@modules/users/repositories/mocks/mock-user-repository'
import { MockTokenRepository } from '@modules/users/repositories/mocks/mock-token-repository'

import { AppError } from '@shared/errors/app-error'
import { MockHashProvider } from '@shared/container/providers/hash-provider/mocks/mock-hash-provider'
import { MockTokenProvider } from '@shared/container/providers/token-provider/mocks/mock-token-provider'

let mockUserRepository: MockUserRepository
let mockHashProvider: MockHashProvider
let mockTokenProvider: MockTokenProvider
let createUserService: CreateUserService
let mockTokenRepository: MockTokenRepository
let loginService: LoginService

describe('Authenticate user', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository()
    mockHashProvider = new MockHashProvider()
    mockTokenProvider = new MockTokenProvider()
    mockTokenRepository = new MockTokenRepository()
    createUserService = new CreateUserService(mockHashProvider, mockUserRepository)
    loginService = new LoginService(
      mockHashProvider,
      mockUserRepository,
      mockTokenProvider,
      mockTokenRepository
    )
  })

  it('should be able to authenticate', async () => {
    const user = await createUserService.handle({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const authenticate = await loginService.handle({
      email: user!.email,
      password: user!.password,
     })

     expect(authenticate).toHaveProperty("token")
     expect(authenticate?.user).toEqual(user)
  })

  it('shout not be able to authenticate with non existing user', async () => {
    const user = {
      email: 'johndoe@example.com',
      password: '123456',
    }

    await expect(loginService.handle(user)).rejects.toBeInstanceOf(AppError)
  })

  it ('shoult not be able to authenticate with wrong password', async () => {
    const createdUser = await createUserService.handle({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const user = {
      email: createdUser!.email,
      password: 'wrong-password'
    }

    await expect(loginService.handle(user)).rejects.toBeInstanceOf(AppError)
  })
})
