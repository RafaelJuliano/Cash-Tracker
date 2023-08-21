import { HttpException } from './HttpException'

export class NotFoundException extends HttpException {
  constructor(message = 'Not Found.') {
    super('Not Found.', 400, { message })
  }
}
