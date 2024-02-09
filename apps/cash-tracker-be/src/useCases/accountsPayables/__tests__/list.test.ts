import {
  AccountStatus,
  Domain,
  createDomainPrefix,
  getEndOfYesterdayUTC,
  getStartOfTodayUTC,
} from '@cash-tracker/common'
import { mocked } from 'jest-mock'
import { addDays, subDays } from 'date-fns'
import { execute } from '../list'
import { mongoAccountPayableRepository } from '../../../repositories'
import { AccountPayableModel } from '../../../models/AccountPayable'

jest.mock('@cash-tracker/common', () => ({
  ...jest.requireActual('@cash-tracker/common'),
  createDomainPrefix: jest.fn(),
  getEndOfYesterdayUTC: jest.fn(),
  getStartOfTodayUTC: jest.fn(),
}))
jest.mock('../../../repositories')
jest.mock('date-fns/startOfDay')
jest.mock('date-fns/endOfDay')

describe('Accounts Payable UseCase - list', () => {
  const date = new Date('2023-08-23T00:00:00.000+00:00')
  const endOfYesterday = new Date('2024-08-22T23:59:59.999Z')
  beforeEach(() => {
    mocked(createDomainPrefix).mockReturnValue(accpId)
    mocked(getEndOfYesterdayUTC).mockReturnValue(endOfYesterday)
    mocked(getStartOfTodayUTC).mockReturnValue(date)
  })

  const accpId = createDomainPrefix(Domain.ACCOUNT_PAYABLE)

  const createModel = (dueDate?: Date): AccountPayableModel[] => [
    {
      id: accpId,
      name: 'name',
      description: 'description',
      originalAmount: 10000,
      rebate: 50,
      dueDate: dueDate || date,
      barcode: '123456789',
      createdAt: date,
      deleted: false,
      updatedAt: null,
    },
  ]

  it('should get an account', async () => {
    mocked(mongoAccountPayableRepository.find).mockResolvedValue(createModel())

    const payload = {
      showDeleted: false,
      limit: 0,
      offset: 0,
    }

    const response = await execute(payload)

    expect(mocked(mongoAccountPayableRepository.find)).toHaveBeenCalledWith(payload)
    expect(response).toStrictEqual([
      {
        ...createModel()[0],
        status: AccountStatus.PENDING,
      },
    ])
  })

  describe('handleStatusFilter', () => {
    it(`status: ${AccountStatus.OVERDUE}. Should use end of yesterday`, async () => {
      mocked(mongoAccountPayableRepository.find).mockResolvedValue(createModel())

      const payload = {
        showDeleted: false,
        limit: 0,
        offset: 0,
        status: AccountStatus.OVERDUE,
      }

      await execute(payload)

      expect(mocked(mongoAccountPayableRepository.find)).toHaveBeenCalledWith({
        ...payload,
        toDueDate: endOfYesterday.toISOString(),
      })
    })

    it(`status: ${AccountStatus.OVERDUE}. Should use toDueDate if before end of yesterday`, async () => {
      mocked(mongoAccountPayableRepository.find).mockResolvedValue(createModel())

      const payload = {
        showDeleted: false,
        limit: 0,
        offset: 0,
        status: AccountStatus.OVERDUE,
        toDueDate: subDays(endOfYesterday, 1).toISOString(),
      }

      await execute(payload)

      expect(mocked(mongoAccountPayableRepository.find)).toHaveBeenCalledWith(payload)
    })

    it(`status: ${AccountStatus.PENDING}. Should use start of today`, async () => {
      mocked(mongoAccountPayableRepository.find).mockResolvedValue(createModel())

      const payload = {
        showDeleted: false,
        limit: 0,
        offset: 0,
        status: AccountStatus.PENDING,
      }

      await execute(payload)

      expect(mocked(mongoAccountPayableRepository.find)).toHaveBeenCalledWith({
        ...payload,
        fromDueDate: date.toISOString(),
      })
    })

    it(`status: ${AccountStatus.PENDING}. Should use fromDueDate if after start of today`, async () => {
      mocked(mongoAccountPayableRepository.find).mockResolvedValue(createModel())

      const payload = {
        showDeleted: false,
        limit: 0,
        offset: 0,
        status: AccountStatus.PENDING,
        fromDueDate: addDays(date, 1).toISOString(),
      }

      await execute(payload)

      expect(mocked(mongoAccountPayableRepository.find)).toHaveBeenCalledWith(payload)
    })
  })
})
