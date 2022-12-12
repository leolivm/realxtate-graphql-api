import 'reflect-metadata'

import { CreateUserService } from '@modules/users/use-cases/create-user.service'
import { FakeUserRepository } from '@modules/users/repositories/fakes/fake-user-repository'

import { AppError } from '@shared/errors/app-error'
import { FakeHashProvider } from '@shared/container/providers/hash-provider/fakes/fake-hash-provider'

let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let createUserService: CreateUserService

describe('Create user', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()
    createUserService = new CreateUserService(fakeHashProvider, fakeUserRepository)
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
