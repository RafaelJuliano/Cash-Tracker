import type { Schema } from 'yup'
import type { Middleware, HandlerRequest } from '../middify'
import { handleYupValidationError, yupValidate } from '../../utils/yupUtils'
import { safeParse } from '../../utils'

export const validateBody = (schema: Schema): Middleware => {
  return {
    before: (request: HandlerRequest) => {
      try {
        const body = safeParse(request.event.body)
        yupValidate(schema, body)
      } catch (error) {
        handleYupValidationError(error)
      }
    },
  }
}
