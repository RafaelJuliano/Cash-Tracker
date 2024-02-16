import {
  AccountPayable,
  Domain,
  NotFoundException,
  createDomainPrefix,
  getUtcDate,
} from '@cash-tracker/common'
import startOfDay from 'date-fns/startOfDay'
import { CreateAccountPayableDTO } from '../../dtos/createAccountPayableDto'
import { mongoAccountPayableRepository } from '../../repositories'
import { AccountPayableModel } from '../../models/AccountPayable'
import { getAccountStatus } from '../../utils/accountUtils'

export const execute = async (
  createAccountPayableDto: CreateAccountPayableDTO,
): Promise<AccountPayable> => {
  await checkCustomer(createAccountPayableDto.customer)

  const now = getUtcDate()

  const accountPayableModel: AccountPayableModel = {
    ...createAccountPayableDto,
    id: createDomainPrefix(Domain.ACCOUNT_PAYABLE),
    createdAt: now,
    updatedAt: now,
    dueDate: startOfDay(getUtcDate(createAccountPayableDto.dueDate)),
    deleted: false,
  }

  const accountPayable = await mongoAccountPayableRepository.create(accountPayableModel)
  return {
    ...accountPayable,
    status: getAccountStatus(accountPayable.dueDate),
  }
}

const checkCustomer = async (customer: AccountPayable['customer']): Promise<void> => {
  // There is no Customer table yet.
  // TODO: Check if customer exists.
  if (customer) {
    throw new NotFoundException(`customer ${customer} does not exists.`)
  }
}
