import { Field, ObjectType, ID } from 'type-graphql'
import { User } from '@modules/users/infra/prisma/models/user'

@ObjectType()
export class Tokens {
  @Field(() => ID)
  id: string

  @Field(() => String)
  token: string

  @Field(() => User)
  userId: string

  @Field(() => Date)
  created_at: Date

  @Field(() => Date)
  updated_at: Date
}
