import { Field, InputType, ObjectType } from 'type-graphql'

import { User } from '@modules/users/infra/prisma/models/user'

@InputType()
export class UserSchema {
  @Field()
  name: string

  @Field()
  email: string

  @Field()
  password: string
}

@InputType()
export class LoginSchema {
  @Field()
  email: string

  @Field()
  password: string
}

@ObjectType()
export class UserWithToken {
  @Field()
  user: User

  @Field()
  token: string
}
