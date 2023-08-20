import { UnauthorizedException } from '../../exceptions/UnauthorizedException'
import type { Middleware, HandlerRequest } from '../middify'

export const withXApiKey = (xApiKey: string): Middleware => {
  return {
    before: (request: HandlerRequest) => {
      const token = request.event.headers['x-api-key']
      if (!token || token !== xApiKey) {
        throw new UnauthorizedException()
      }
    },
  }
}
