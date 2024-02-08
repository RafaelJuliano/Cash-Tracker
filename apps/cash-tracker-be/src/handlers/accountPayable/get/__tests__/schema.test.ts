import { yupValidate } from '@cash-tracker/common'
import { getAccountPayableSchema } from '../schema'

describe('Schema - GetAccountPayableSchema', () => {
  const createValidDto = () => ({
    id: 'accp_741ee9dd-065a-4813-b5e5-5badb9ae182d',
  })
  const validate = (object: object, errors?: string[]) => {
    try {
      yupValidate(getAccountPayableSchema, object)
      return true
    } catch (error) {
      if (!errors) {
        return false
      }
      expect(error.errors).toStrictEqual(errors)
    }
  }
  it('should validate path', () => {
    expect(validate(createValidDto())).toBeTruthy()
  })

  it('should validate an invalid path', () => {
    validate({ id: 'invalid' }, ['id must be a valid domain id'])
  })

  it('should validate undefined id', () => {
    validate({ id: undefined }, ['id is a required field'])
  })
})
