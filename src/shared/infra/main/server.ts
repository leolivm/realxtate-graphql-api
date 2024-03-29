import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'

import { context } from '@shared/infra/context'
import { registerContainers } from '@shared/container'
import { UserResolver } from '@modules/users/resolvers/user.resolver'
import { RentsResolver } from '@modules/rents/resolvers/rent.resolver'

const app = async () => {
  registerContainers()

  const schema = await buildSchema({
    resolvers: [UserResolver, RentsResolver],
  })

  new ApolloServer({ schema, context }).listen({ port: 3333 }, () =>
    console.log('~ Server is running at port 3333')
  )
}

app()
