import { MiddlewareFn } from 'type-graphql'

import { AppError } from '@shared/errors/app-error'
import { TokenProvider } from '@shared/container/providers/token-provider/implementations/token-provider'

interface AuthContext {
  user: {
    id: string | (() => string) | undefined
  }
}

export const authMiddleware: MiddlewareFn<AuthContext> = async ({ args, context }, next) => {
  const token = args.token || args.data.token
  const tokenProvider = new TokenProvider()

  if (!token) {
    throw new AppError('JWT Token not found.', '401')
  }
  
  try {
    const decoded = tokenProvider.verifyToken(token)

    const { sub } = decoded

    context.user = {
      id: sub
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT Token.', '401')
  }
}
