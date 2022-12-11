import { container } from 'tsyringe'

import { IHashProvider } from '@shared/container/providers/hash-provider/models/IHashProvider'
import { BCryptHashProvider } from '@shared/container/providers/hash-provider/implementations/bcrypt-hash-provider'

export const registerHashProviderContainer = (): void => {
  container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
}
