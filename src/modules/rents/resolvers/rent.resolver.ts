import { container } from 'tsyringe'
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'

import { Rents } from '@modules/rents/infra/prisma/models/rents'

import { CreateRentController } from '@modules/rents/infra/controllers/create-rent.controller'

import { RentSchema } from '@modules/rents/schema/rent'
import { authMiddleware } from '@shared/infra/middlewares/auth-middleware'

@Resolver()
export class RentsResolver {
  @Query(() => Rents, {})
  @UseMiddleware(authMiddleware)
  async rents(@Arg('token') token: string): Promise<string | undefined> {
    return token
  }

  @Mutation(() => Rents)
  @UseMiddleware(authMiddleware)
  async createRent(@Arg('data') data: RentSchema): Promise<Rents | null> {
    return await container.resolve(CreateRentController).handle(data)
  }
}
