import type { Schema } from 'yup'
import type { Middleware, HandlerRequest } from '../middify'
import { handleYupValidationError, yupValidate } from '../../utils/yupUtils'

export const validateEvent = (schema: Schema): Middleware => {
  return {
    before: (request: HandlerRequest) => {
      try {
        yupValidate(schema, request.event)
      } catch (error) {
        handleYupValidationError(error)
      }
    },
  }
}
