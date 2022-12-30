import { container } from 'tsyringe'
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'

import { User } from '@modules/users/infra/prisma/models/user'

import { FindByToken } from '@modules/users/dtos/find-user-by-token-dto'
import { LoginUserResponseDTO } from '@modules/users/dtos/login-user-dto'

import { LoginController } from '@modules/users/infra/controllers/login.controller'
import { SignUpController } from '@modules/users/infra/controllers/sign-up.controller'
import { FindUserController } from '@modules/users/infra/controllers/find-user.controller'

import { UserSchema, UserWithToken, LoginSchema } from '@modules/users/schema/user'
import { authMiddleware } from '@shared/infra/middlewares/authMiddleware'

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(authMiddleware)
  async user(@Arg('token') token: string): Promise<FindByToken | undefined> {
    return await container.resolve(FindUserController).handle(token)
  }

  @Mutation(() => User)
  async signUp(@Arg('data') data: UserSchema): Promise<User | null> {
    return await container.resolve(SignUpController).handle(data)
  }

  @Mutation(() => UserWithToken)
  async login(@Arg('data') data: LoginSchema): Promise<LoginUserResponseDTO | null> {
    return await container.resolve(LoginController).handle(data)
  }
}
