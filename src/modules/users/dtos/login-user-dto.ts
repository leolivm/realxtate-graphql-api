import { User } from '@modules/users/infra/prisma/models/user'

export interface LoginUserRequestDTO {
  email: string
  password: string
}

export interface LoginUserResponseDTO {
  user: User
  token: string
}
