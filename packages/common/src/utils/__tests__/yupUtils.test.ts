import * as yup from 'yup'
import { handleYupValidationError, yupValidate } from '../yupUtils'
import { BadRequestException } from '../../exceptions/BadRequestException'

describe('Utils - yupUtils', () => {
  describe('yupValidate', () => {
    it('should validate a schema', () => {
      const schema = yup.object({
        key: yup.string(),
      })
      const validObject = { key: 'value' }
      const spySchema = jest.spyOn(schema, 'validateSync')
      yupValidate(schema, validObject)
      expect(spySchema).toBeCalledWith(
        { key: 'value' },
        { abortEarly: false, recursive: true, strict: true, stripUnknown: true },
      )
    })
  })

  describe('handleYupValidationError', () => {
    it('should convert ValidationError into BadRequestExcpetion', () => {
      const errors = ['error']
      try {
        handleYupValidationError(new yup.ValidationError('validation error', { errors }))
        throw new Error('should not be here')
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })

    it('should trhow unknow errors', () => {
      try {
        handleYupValidationError(new Error('message'))
        throw new Error('should not be here')
      } catch (error) {
        expect(error).not.toBeInstanceOf(BadRequestException)
        expect(error.message).toBe('message')
      }
    })
  })
})
