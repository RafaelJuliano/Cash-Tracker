import { Domain, createDomainPrefix, yup, yupValidate } from '@cash-tracker/common'
import {
  yupDateTest,
  yupDomainIdTest,
  yupNumberStringSchema,
  yupProjectionTest,
} from '../schema'

describe('Schema - Shared', () => {
  const validate = (schema, dto: unknown, errors?: string[]) => {
    try {
      yupValidate(schema, dto)
      return true
    } catch (error) {
      if (!errors) {
        return false
      }
      expect(error.errors).toStrictEqual(errors)
    }
  }

  describe('yupDomainIdTest', () => {
    it.each(Object.values(Domain))('should validate id with domain %s', domain => {
      const schema = yup.string().test(yupDomainIdTest(domain))
      const dto = createDomainPrefix(domain)

      expect(validate(schema, dto)).toBeTruthy()
      expect(validate(schema, undefined)).toBeTruthy()
    })

    it.each(Object.values(Domain))(
      'should validate an invalid id with domain %s',
      domain => {
        const schema = yup.string().test(yupDomainIdTest(domain))
        validate(schema, 'id', ['this must be a valid domain id'])
      },
    )
  })

  describe('yupDateTest', () => {
    it('Should validate a valid date string', () => {
      const schema = yup.string().test(yupDateTest())

      expect(validate(schema, '2024-01-01')).toBeTruthy()
      expect(validate(schema, undefined)).toBeTruthy()
    })

    it('Should validate an invalid date string', () => {
      const schema = yup.string().test(yupDateTest())

      validate(schema, 'January 1st', ['this must be a valid date string'])
    })
  })

  describe('yupProjectionTest', () => {
    const validFields = ['fieldOne', 'fieldTwo']
    it('Should validate a valid projection string', () => {
      const schema = yup.string().test(yupProjectionTest(validFields))

      expect(validate(schema, validFields.join(','))).toBeTruthy()
      expect(validate(schema, undefined)).toBeTruthy()
    })

    it('Should validate an invalid projection string', () => {
      const schema = yup.string().test(yupProjectionTest(validFields))

      validate(schema, 'invalid', [
        `this should contain only the following values: ${validFields.join(', ')}`,
      ])
    })
  })

  describe('yupNumberStringSchema', () => {
    it('Should validate a valid number string', () => {
      const schema = yupNumberStringSchema

      expect(validate(schema, '12354')).toBeTruthy()
      expect(validate(schema, undefined)).toBeTruthy()
    })

    it('Should validate an invalid number string', () => {
      const schema = yupNumberStringSchema

      validate(schema, 'invalid', ['this should contain only digits'])
    })

    it('Should transform the value from string to number', () => {
      const cast = yupNumberStringSchema.cast('10')

      expect(cast).toStrictEqual(10)
    })
  })
})
