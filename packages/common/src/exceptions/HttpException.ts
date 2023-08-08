export class HttpException extends Error {
  readonly statusCode: number
  readonly body: object
  constructor(message: string, statusCode: number, body = {}) {
    super(message)
    this.statusCode = statusCode
    this.body = {
      message,
      ...body
    }
  }
}