import { IHashProvider } from '@shared/container/providers/hash-provider/models/IHashProvider'

export class MockHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed
  }
}
