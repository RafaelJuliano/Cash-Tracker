import { Domain, createDomainPrefix, yup, yupValidate } from '@cash-tracker/common'
import { yupDateTest, yupDomainIdTest } from '../schema'

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
})
