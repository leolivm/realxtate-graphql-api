import { hash, compare } from 'bcrypt'

import { IHashProvider } from '@shared/container/providers/hash-provider/models/IHashProvider'

export class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(String(payload), 8)
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(String(payload), hashed)
  }
}
