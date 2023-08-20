import { HttpException } from './HttpException'

export class BadRequestException extends HttpException {
  constructor(body?: object) {
    super('Bad Request.', 400, body)
  }
}
