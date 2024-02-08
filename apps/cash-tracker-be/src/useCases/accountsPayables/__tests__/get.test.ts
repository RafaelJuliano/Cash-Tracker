import {
  AccountStatus,
  Domain,
  NotFoundException,
  createDomainPrefix,
} from '@cash-tracker/common'
import { startOfDay } from 'date-fns'
import { mocked } from 'jest-mock'
import { execute } from '../get'
import { mongoAccountPayableRepository } from '../../../repositories'
import { AccountPayableModel } from '../../../models/AccountPayable'

jest.mock('@cash-tracker/common', () => ({
  ...jest.requireActual('@cash-tracker/common'),
  createDomainPrefix: jest.fn(),
}))
jest.mock('../../../repositories')
jest.mock('date-fns/startOfDay')

describe('Accounts Payable UseCase - get', () => {
  const date = new Date('2023-08-23T00:00:00.000+00:00')
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(date)
    mocked(startOfDay).mockReturnValue(date)
    mocked(createDomainPrefix).mockReturnValue(accpId)
  })

  const accpId = createDomainPrefix(Domain.ACCOUNT_PAYABLE)

  const createModel = (dueDate?: Date): AccountPayableModel => ({
    id: accpId,
    name: 'name',
    description: 'description',
    originalAmount: 10000,
    rebate: 50,
    dueDate: dueDate || date,
    barcode: '123456789',
    createdAt: new Date(),
    deleted: false,
    updatedAt: null,
  })

  it('should get an account', async () => {
    mocked(mongoAccountPayableRepository.findById).mockResolvedValue(createModel())

    const response = await execute(accpId)

    expect(mocked(mongoAccountPayableRepository.findById)).toHaveBeenCalledWith(accpId)
    expect(response).toStrictEqual({
      ...createModel(),
      status: AccountStatus.PENDING,
    })
  })

  it('should get an account', async () => {
    mocked(mongoAccountPayableRepository.findById).mockResolvedValue(createModel())

    const response = await execute(accpId)

    expect(mocked(mongoAccountPayableRepository.findById)).toHaveBeenCalledWith(accpId)
    expect(response).toStrictEqual({
      ...createModel(),
      status: AccountStatus.PENDING,
    })
  })

  it('should throw NotFound if account does not exists', async () => {
    mocked(mongoAccountPayableRepository.findById).mockResolvedValue(null)
    expect(execute(accpId)).rejects.toThrow(NotFoundException)
  })
})
