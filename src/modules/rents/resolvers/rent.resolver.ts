import { container } from 'tsyringe'
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'

import { RentSchema } from '@modules/rents/schema/rent'
import { Rents } from '@modules/rents/infra/prisma/models/rents'

import { CreateRentController } from '@modules/rents/infra/controllers/create-rent.controller'
import { FindAllRentsController } from '@modules/rents/infra/controllers/find-all-rents.controller'

import { authMiddleware } from '@shared/infra/middlewares/auth-middleware'

@Resolver()
export class RentsResolver {
  @Query(() => [Rents])
  async findAllRents(): Promise<Rents[]> {
    return await container.resolve(FindAllRentsController).handle()
  }

  @Mutation(() => Rents)
  @UseMiddleware(authMiddleware)
  async createRent(@Arg('data') data: RentSchema): Promise<Rents | null> {
    return await container.resolve(CreateRentController).handle(data)
  }
}
