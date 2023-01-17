import { Prisma } from '@prisma/client'
import { Field, InputType } from 'type-graphql'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'

@InputType()
export class RentSchema {
  @Field()
  monthly_cost: number

  @Field()
  currency: string

  @Field()
  bedrooms: number

  @Field()
  bathrooms: number

  @Field()
  square_feets: number

  @Field()
  image_url: string

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  location: string

  @Field(() => GraphQLDecimal)
  latitude: Prisma.Decimal

  @Field(() => GraphQLDecimal)
  longitude: Prisma.Decimal

  @Field()
  rent: boolean

  @Field()
  is_verified: boolean

  @Field()
  contact: string

  @Field()
  token: string
}
