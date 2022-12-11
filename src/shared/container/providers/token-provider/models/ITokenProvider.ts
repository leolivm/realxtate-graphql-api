import { JwtPayload } from 'jsonwebtoken'

export interface ITokenProvider {
  signToken(id: string): string
  verifyToken(token: string): JwtPayload | string
}
