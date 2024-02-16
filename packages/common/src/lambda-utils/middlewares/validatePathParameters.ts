import type { Schema } from 'yup'
import type { Middleware, HandlerRequest } from '../middify'
import { handleYupValidationError, yupValidate } from '../../utils/yupUtils'

export const validatePathParameters = (schema: Schema): Middleware => {
  return {
    before: (request: HandlerRequest) => {
      try {
        yupValidate(schema, request.event.pathParameters || {})
      } catch (error) {
        handleYupValidationError(error)
      }
    },
  }
}
