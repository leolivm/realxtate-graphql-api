import { JwtPayload, sign, verify } from 'jsonwebtoken'

import authConfig from '@config/auth'
import { ITokenProvider } from '@shared/container/providers/token-provider/models/ITokenProvider'

export class TokenProvider implements ITokenProvider {
  public signToken(id: string): string {
    return sign({}, authConfig.jwt.secret, {
      subject: id,
      expiresIn: authConfig.jwt.expiresIn,
    })
  }

  public verifyToken(token: string): string | JwtPayload {
    return verify(token, authConfig.jwt.secret)
  }
}
