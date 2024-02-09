import {
  AccountStatus,
  Domain,
  NotFoundException,
  createDomainPrefix,
  getStartOfTodayUTC,
  getUtcDate,
} from '@cash-tracker/common'
import { startOfDay, subDays } from 'date-fns'
import { mocked } from 'jest-mock'
import { execute } from '../create'
import { CreateAccountPayableDTO } from '../../../dtos/createAccountPayableDto'
import { mongoAccountPayableRepository } from '../../../repositories'

jest.mock('@cash-tracker/common', () => ({
  ...jest.requireActual('@cash-tracker/common'),
  getUtcDate: jest.fn(),
  getStartOfTodayUTC: jest.fn(),
  createDomainPrefix: jest.fn(),
}))
jest.mock('../../../repositories')
jest.mock('date-fns/startOfDay')

describe('Accounts Payable UseCase - create', () => {
  const date = new Date('2023-08-23T00:00:00.000+00:00')
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(date)
    mocked(getUtcDate).mockReturnValue(date)
    mocked(startOfDay).mockReturnValue(date)
    mocked(getStartOfTodayUTC).mockReturnValue(date)
    mocked(createDomainPrefix).mockReturnValue(accpId)
  })

  const accpId = createDomainPrefix(Domain.ACCOUNT_PAYABLE)

  const createDto = (): CreateAccountPayableDTO => ({
    name: 'name',
    description: 'description',
    originalAmount: 10000,
    rebate: 50,
    dueDate: '2023-08-25',
    barcode: '123456789',
  })

  const createAccountPayable = (dueDate?: Date) => ({
    ...createDto(),
    dueDate: dueDate || date,
    id: accpId,
    createdAt: date,
    updatedAt: date,
    deleted: false,
  })

  it('should create an account', async () => {
    mocked(mongoAccountPayableRepository.create).mockResolvedValue(createAccountPayable())

    const response = await execute(createDto())

    expect(mocked(createDomainPrefix)).toHaveBeenCalledWith(Domain.ACCOUNT_PAYABLE)
    expect(mocked(mongoAccountPayableRepository.create)).toHaveBeenCalledWith(
      createAccountPayable(),
    )
    expect(response).toStrictEqual({
      ...createAccountPayable(),
      status: AccountStatus.PENDING,
    })
  })

  it('should return overdue status', async () => {
    mocked(mongoAccountPayableRepository.create).mockResolvedValue(
      createAccountPayable(subDays(date, 3)),
    )

    const response = await execute(createDto())

    expect(response.status).toBe(AccountStatus.OVERDUE)
  })

  it('should throw NotFound if customer does not exists', async () => {
    const dto = createDto()
    dto.customer = 'cust_12345'
    expect(execute(dto)).rejects.toThrow(NotFoundException)
  })
})
