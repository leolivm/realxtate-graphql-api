import { IUserDTO } from '@modules/users/dtos/create-user-dto'
import { User } from '@modules/users/infra/prisma/models/user'

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined | null>
  create(data: IUserDTO): Promise<User>
}
