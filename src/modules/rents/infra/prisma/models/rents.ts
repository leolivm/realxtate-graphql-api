import { Prisma } from '@prisma/client'
import { Field, ObjectType, ID } from 'type-graphql'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'

import { User } from '@modules/users/infra/prisma/models/user'

@ObjectType()
export class Rents {
  @Field(() => ID)
  id: string

  @Field(() => Number)
  monthly_cost: number

  @Field(() => String)
  currency: string

  @Field(() => Number)
  bedrooms: number

  @Field(() => Number)
  bathrooms: number

  @Field(() => Number)
  square_feets: number

  @Field(() => String)
  image_url: string

  @Field(() => String)
  title: string

  @Field(() => String)
  description: string

  @Field(() => String)
  location: string

  @Field(() => GraphQLDecimal)
  latitude: Prisma.Decimal

  @Field(() => GraphQLDecimal)
  longitude: Prisma.Decimal

  @Field(() => Boolean)
  rent: boolean

  @Field(() => String)
  contact: string

  @Field(() => User)
  userId: string

  @Field(() => Date)
  created_at: Date

  @Field(() => Date)
  updated_at: Date
}
