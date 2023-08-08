import { HttpException } from '../../exceptions'
import type { Middleware, HandlerRequest } from '../middify'

export const handleUnknowErrors = (): Middleware => {
  return {
    onError: (request: HandlerRequest) => {
      const { error } = request
      if (error instanceof HttpException) {
        request.response = {
          statusCode: error.statusCode,
          body: JSON.stringify({
            message: error.message,
            ...error.body
          })
        }
      } else {
        request.response = {
          statusCode: 500,
          body: JSON.stringify({
            message: 'Oops something went wrong. Please try again later.'
          })
        }
      }
    }
  }
}