import { HttpException } from './HttpException'

export class UnauthorizedException extends HttpException {
  constructor() {
    super('Unauthorized.', 401)
  }
}
