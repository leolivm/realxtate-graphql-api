import { container } from 'tsyringe'

import { IUsersRepository } from '@modules/users/repositories/user-repository'
import { UsersRepository } from '@modules/users/infra/prisma/repositories/prisma-user-repository'

import { ITokensRepository } from '@modules/users/repositories/token-repository'
import { TokensRepository } from '@modules/users/infra/prisma/repositories/prisma-token-repository'

import { IRentRepository } from '@modules/rents/repositories/rent-repository'
import { RentsRepository } from '@modules/rents/infra/prisma/repositories/prisma-rent-repository'

import { registerHashProviderContainer } from '@shared/container/providers/hash-provider'
import { registerTokenProviderContainer } from '@shared/container/providers/token-provider'

export const registerContainers = (): void => {
  container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
  container.registerSingleton<ITokensRepository>('TokensRepository', TokensRepository)
  container.registerSingleton<IRentRepository>('RentsRepository', RentsRepository)

  registerHashProviderContainer()
  registerTokenProviderContainer()
}
