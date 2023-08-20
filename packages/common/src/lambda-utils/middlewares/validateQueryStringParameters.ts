import type { Schema } from 'yup'
import type { Middleware, HandlerRequest } from '../middify'
import { handleYupValidationError, yupValidate } from '../../utils/yupUtils'

export const validateQueryStringParameters = (schema: Schema): Middleware => {
  return {
    before: (request: HandlerRequest) => {
      try {
        yupValidate(schema, request.event.queryStringParameters)
      } catch (error) {
        handleYupValidationError(error)
      }
    },
  }
}
