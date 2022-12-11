import { Field, ObjectType, ID } from 'type-graphql'
import { IsEmail } from 'class-validator'

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field()
  @IsEmail()
  email: string

  @Field(() => String)
  name: string

  @Field(() => String)
  password: string

  @Field(() => Date)
  created_at: Date

  @Field(() => Date)
  updated_at: Date
}
