import 'reflect-metadata'
import { Prisma } from '@prisma/client'

import { LoginService } from '@modules/users/use-cases/login.service'
import { CreateUserService } from '@modules/users/use-cases/create-user.service'
import { MockUserRepository } from '@modules/users/repositories/mocks/mock-user-repository'

import { AppError } from '@shared/errors/app-error'
import { MockHashProvider } from '@shared/container/providers/hash-provider/mocks/mock-hash-provider'
import { MockTokenProvider } from '@shared/container/providers/token-provider/mocks/mock-token-provider'

import { CreateRentService } from '@modules/rents/use-cases/create-rent.service'
import { MockRentsRepository } from '@modules/rents/repositories/mocks/mock-rent-repository'
import { MockTokenRepository } from '@modules/users/repositories/mocks/mock-token-repository'

let mockUserRepository: MockUserRepository
let mockHashProvider: MockHashProvider
let createUserService: CreateUserService

let mockTokenProvider: MockTokenProvider
let loginService: LoginService

let mockRentsRepository: MockRentsRepository
let mockTokenRepository: MockTokenRepository
let createRentService: CreateRentService

describe('Create rent', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository()
    mockHashProvider = new MockHashProvider()
    mockTokenRepository = new MockTokenRepository()
    mockRentsRepository = new MockRentsRepository()
    mockTokenProvider = new MockTokenProvider()
    createRentService = new CreateRentService(mockTokenRepository, mockRentsRepository)
    createUserService = new CreateUserService(mockHashProvider, mockUserRepository)
    loginService = new LoginService(
      mockHashProvider,
      mockUserRepository,
      mockTokenProvider,
      mockTokenRepository
    )
  })

  it('should be abe to create a rent', async () => {
    const user = await createUserService.handle({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const authenticate = await loginService.handle({
      email: user!.email,
      password: user!.password,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rent: any = await createRentService.handle({
      rent: true,
      title: 'House',
      contact: '+55 (99) 99999999',
      bedrooms: 2,
      currency: 'USD',
      latitude: new Prisma.Decimal(99),
      longitude: new Prisma.Decimal(99),
      location: 'San Francisco',
      bathrooms: 1,
      image_url: 'https://github.com/leolivm',
      description: 'Big one',
      monthly_cost: 250.0,
      cost: 400000,
      square_feets: 75,
      is_verified: false,
      token: authenticate!.token,
    })

    expect(rent).toHaveProperty('data.monthly_cost')
    expect(rent?.data?.userId).toEqual(user!.id)
  })

  it('should not be able to create a rent with non existing user', async () => {
    const payload = {
      rent: true,
      title: 'House',
      contact: '+55 (99) 99999999',
      bedrooms: 2,
      currency: 'USD',
      latitude: new Prisma.Decimal(10),
      longitude: new Prisma.Decimal(10),
      location: 'San Francisco',
      bathrooms: 1,
      image_url: 'https://github.com/leolivm',
      description: 'Big one',
      monthly_cost: 250.0,
      cost: 400000,
      square_feets: 75,
      is_verified: false,
      token: 'non-existing-user-token',
    }

    await expect(createRentService.handle(payload)).rejects.toBeInstanceOf(AppError)
  })
})
