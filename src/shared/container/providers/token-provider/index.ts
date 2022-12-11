import { container } from 'tsyringe'

import { ITokenProvider } from '@shared/container/providers/token-provider/models/ITokenProvider'
import { TokenProvider } from '@shared/container/providers/token-provider/implementations/token-provider'

export const registerTokenProviderContainer = (): void => {
  container.registerSingleton<ITokenProvider>('TokenProvider', TokenProvider)
}
