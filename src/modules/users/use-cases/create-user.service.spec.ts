import 'reflect-metadata'

import { CreateUserService } from '@modules/users/use-cases/create-user.service'
import { MockUserRepository } from '@modules/users/repositories/mocks/mock-user-repository'

import { AppError } from '@shared/errors/app-error'
import { MockHashProvider } from '@shared/container/providers/hash-provider/mocks/mock-hash-provider'

let mockUserRepository: MockUserRepository
let mockHashProvider: MockHashProvider
let createUserService: CreateUserService

describe('Create user', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository()
    mockHashProvider = new MockHashProvider()
    createUserService = new CreateUserService(mockHashProvider, mockUserRepository)
  })

  it('should be able to create a new user', async () => {
    const user = await createUserService.handle({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    const user = await createUserService.handle(userData)

    const userClone = {
      email: user!.email,
      name: user!.name,
      password: user!.password,
    }

    await expect(createUserService.handle(userClone)).rejects.toBeInstanceOf(AppError)
  })
})
