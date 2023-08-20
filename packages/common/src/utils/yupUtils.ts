import { ValidationError, type Schema } from 'yup'
import { BadRequestException } from '../exceptions/BadRequestException'

export const yupValidate = (schema: Schema, object: unknown) => {
  schema.validateSync(object, {
    strict: true,
    stripUnknown: true,
    recursive: true,
    abortEarly: false,
  })
}

export const handleYupValidationError = (error: Error) => {
  if (error instanceof ValidationError) {
    const { errors } = error
    throw new BadRequestException({ errors })
  }
  throw error
}
