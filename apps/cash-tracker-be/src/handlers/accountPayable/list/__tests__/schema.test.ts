import { AccountStatus, yupValidate } from '@cash-tracker/common'
import { availableProjecetionFields, listAccountPayableSchema } from '../schema'

describe('Schema - listAccountPayableSchema', () => {
  const createValidDto = () => ({
    name: 'Coleção turma da Mônica [3-12]',
    amountLessThan: '100000',
    amountGreaterThan: '20000',
    fromDueDate: '2024-01-01',
    toDueDate: '2024-12-01T00:00:00',
    fromCreatedDate: '2024-01-01',
    toCreatedDate: '2024-06-01',
    barcode: '000000599995545666665549',
    status: AccountStatus.OVERDUE,
    customerId: 'cust_741ee9dd-065a-4813-b5e5-5badb9ae182d',
    showDeleted: true,
    limit: '25',
    offset: '10',
  })
  const validate = (object: object, errors?: string[]) => {
    try {
      yupValidate(listAccountPayableSchema, object)
      return true
    } catch (error) {
      if (!errors) {
        return false
      }
      expect(error.errors).toStrictEqual(errors)
    }
  }
  it('should validate correct filters', () => {
    expect(validate(createValidDto())).toBeTruthy()
  })

  it.each(['name', 'barcode'])('should validate string fields', value => {
    const dto = createValidDto()
    dto[value] = 123

    validate(dto, [
      `${value} must be a \`string\` type, but the final value was: \`123\`.`,
    ])
  })

  it.each(['amountLessThan', 'amountGreaterThan'])(
    'should validate number fields',
    value => {
      const dto = createValidDto()
      dto[value] = 'string'

      validate(dto, [`${value} should contain only digits`])
    },
  )

  it.each([
    'cust_123456',
    '741ee9dd-065a-4813-b5e5-5badb9ae182d',
    'accp_741ee9dd-065a-4813-b5e5-5badb9ae182d',
    'id',
  ])('should validate an invalid customerId', customer => {
    const dto = createValidDto()
    dto.customerId = customer
    validate(dto, ['customerId must be a valid domain id'])
  })

  it.each(['fromDueDate', 'toDueDate', 'fromCreatedDate', 'toCreatedDate'])(
    'should validate date fields',
    value => {
      const dto = createValidDto()
      dto[value] = '24/01-01'
      validate(dto, [`${value} must be a valid date string`])
    },
  )

  it('should validate unknow fields', () => {
    const dto = createValidDto()
    Object.assign(dto, {
      unknow: 'value',
    })
    validate(dto, ['this field has unspecified keys: unknow'])
  })

  it('should validate valid projection field', () => {
    const dto = createValidDto()
    Object.assign(dto, {
      projection: availableProjecetionFields.join(','),
    })
    expect(validate(dto)).toBeTruthy()
  })

  it('should validate invalid projection field', () => {
    const dto = createValidDto()
    Object.assign(dto, {
      projection: 'invalid',
    })
    validate(dto, [
      `projection should contain only the following values: ${availableProjecetionFields.join(
        ', ',
      )}`,
    ])
  })
})
