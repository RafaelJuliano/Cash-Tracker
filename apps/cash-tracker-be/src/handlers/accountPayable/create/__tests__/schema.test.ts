import { yupValidate } from '@cash-tracker/common'
import { createAccountPayableSchema } from '../schema'

describe('Schema - CreateAccountPayableSchema', () => {
  const createValidDto = () => ({
    name: 'name',
    description: 'description',
    originalAmount: 10000,
    rebate: 50,
    customer: 'cust_741ee9dd-065a-4813-b5e5-5badb9ae182d',
    dueDate: '2023-08-20',
    barcode: '123456789',
  })
  const validate = (object: object, errors?: string[]) => {
    try {
      yupValidate(createAccountPayableSchema, object)
      return true
    } catch (error) {
      if (!errors) {
        return false
      }
      expect(error.errors).toStrictEqual(errors)
    }
  }
  it('should validate body', () => {
    expect(validate(createValidDto())).toBeTruthy()
  })

  it('should validate only required fields', () => {
    const { name, originalAmount, dueDate } = createValidDto()
    expect(validate({ name, originalAmount, dueDate })).toBeTruthy()
  })

  it.each(['name', 'originalAmount', 'dueDate'])(
    'should validate required fields',
    value => {
      const dto = createValidDto()
      delete dto[value]

      validate(dto, [`${value} is a required field`])
    },
  )

  it.each(['name', 'description', 'customer', 'dueDate', 'barcode'])(
    'should validate string fields',
    value => {
      const dto = createValidDto()
      dto[value] = 123

      validate(dto, [
        `${value} must be a \`string\` type, but the final value was: \`123\`.`,
      ])
    },
  )

  it.each(['originalAmount', 'rebate'])('should validate number fields', value => {
    const dto = createValidDto()
    dto[value] = 'string'

    validate(dto, [
      `${value} must be a \`number\` type, but the final value was: \`"string"\`.`,
    ])
  })

  it('should validate dueDate', () => {
    const dto = createValidDto()
    dto.dueDate = 'invalid'
    validate(dto, ['dueDate must be a valid date string'])
  })

  it.each([
    'cust_123456',
    '741ee9dd-065a-4813-b5e5-5badb9ae182d',
    'accp_741ee9dd-065a-4813-b5e5-5badb9ae182d',
    'id',
  ])('should validate an invalid customerId', customer => {
    const dto = createValidDto()
    dto.customer = customer
    validate(dto, ['customer must be a valid domain id'])
  })

  it('should validate unknow fields', () => {
    const dto = createValidDto()
    Object.assign(dto, {
      unknow: 'value',
    })
    validate(dto, ['this field has unspecified keys: unknow'])
  })
})
