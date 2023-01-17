import 'reflect-metadata'
import { Prisma } from '@prisma/client'

import { CreateRentService } from '@modules/rents/use-cases/create-rent.service'
import { FindAllRentsService } from '@modules/rents/use-cases/find-all-rents.service'
import { MockRentsRepository } from '@modules/rents/repositories/mocks/mock-rent-repository'

import { LoginService } from '@modules/users/use-cases/login.service'
import { CreateUserService } from '@modules/users/use-cases/create-user.service'
import { MockUserRepository } from '@modules/users/repositories/mocks/mock-user-repository'
import { MockTokenRepository } from '@modules/users/repositories/mocks/mock-token-repository'

import { MockHashProvider } from '@shared/container/providers/hash-provider/mocks/mock-hash-provider'
import { MockTokenProvider } from '@shared/container/providers/token-provider/mocks/mock-token-provider'


let loginService: LoginService
let createUserService: CreateUserService
let mockUserRepository: MockUserRepository

let createRentService: CreateRentService
let findAllRentsService: FindAllRentsService
let mockRentsRepository: MockRentsRepository

let mockHashProvider: MockHashProvider
let mockTokenProvider: MockTokenProvider
let mockTokenRepository: MockTokenRepository

describe('Find all rents', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository()
    mockHashProvider = new MockHashProvider()
    mockTokenRepository = new MockTokenRepository()
    mockRentsRepository = new MockRentsRepository()
    mockTokenProvider = new MockTokenProvider()
    createRentService = new CreateRentService(mockTokenRepository, mockRentsRepository)
    createUserService = new CreateUserService(mockHashProvider, mockUserRepository)
    findAllRentsService = new FindAllRentsService(mockRentsRepository)
    loginService = new LoginService(
      mockHashProvider,
      mockUserRepository,
      mockTokenProvider,
      mockTokenRepository
    )
  })

  it('should be able to find all rents', async () => {
    const user = await createUserService.handle({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const authenticate = await loginService.handle({
      email: user!.email,
      password: user!.password,
    })

    const rent = await createRentService.handle({
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
      square_feets: 75,
      is_verified: false,
      token: authenticate!.token,
    })

    expect(await findAllRentsService.handle()).toMatchObject([rent])
  })
})
