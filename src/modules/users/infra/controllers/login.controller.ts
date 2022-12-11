import { container } from 'tsyringe'

import { LoginService } from '@modules/users/use-cases/login.service'
import { LoginUserRequestDTO, LoginUserResponseDTO } from '@modules/users/dtos/login-user-dto'

export class LoginController {
  async handle(data: LoginUserRequestDTO): Promise<LoginUserResponseDTO | null> {
    return await container.resolve(LoginService).handle(data)
  }
}
