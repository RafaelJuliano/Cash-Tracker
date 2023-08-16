import { Schema, ValidationError } from 'yup'
import type { Middleware, HandlerRequest } from '../middify'
import { BadRequestException } from '../../exceptions/BadRequestException'

export const validateEvent = (schema: Schema): Middleware => {
  return {
    before: (request: HandlerRequest) => {
      try {
        schema.validateSync(request.event, {
          strict: true,
          stripUnknown: true,
          recursive: true,
          abortEarly: false,
        })
      } catch (error) {
        if (error instanceof ValidationError) {
          const { errors } = error
          throw new BadRequestException({ errors })
        }
        throw error
      }
    },
  }
}
