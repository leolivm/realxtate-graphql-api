import { JwtPayload } from 'jsonwebtoken'

import { ITokenProvider } from '@shared/container/providers/token-provider/models/ITokenProvider'

export class MockTokenProvider implements ITokenProvider {
  public signToken(id: string): string {
    return id
  }

  public verifyToken(token: string): string | JwtPayload {
    return token
  }
}
