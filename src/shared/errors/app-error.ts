import { ApolloError } from 'apollo-server'

export class AppError extends ApolloError {
  constructor(public message: string = 'Unauthorized', public code = '400') {
    super(message, code)
  }
}
