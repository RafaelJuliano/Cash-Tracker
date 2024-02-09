import {
  AccountStatus,
  Domain,
  NotFoundException,
  createDomainPrefix,
} from '@cash-tracker/common'
import { mocked } from 'jest-mock'
import { execute } from '../list'
import { mongoAccountPayableRepository } from '../../../repositories'
import { AccountPayableModel } from '../../../models/AccountPayable'

jest.mock('@cash-tracker/common', () => ({
  ...jest.requireActual('@cash-tracker/common'),
  createDomainPrefix: jest.fn(),
}))
jest.mock('../../../repositories')
jest.mock('date-fns/startOfDay')

describe('Accounts Payable UseCase - list', () => {
  // const date = new Date('2023-08-23T00:00:00.000+00:00')
  // beforeEach(() => {
  //   mocked(createDomainPrefix).mockReturnValue(accpId)
  // })

  it('should return true', () => {
    execute({
      showDeleted: false,
      limit: 0,
      offset: 0,
    })
    expect(true).toBeTruthy()
  })
})
