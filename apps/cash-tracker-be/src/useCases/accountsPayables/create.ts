import {
  AccountPayable,
  AccountStatus,
  Domain,
  NotFoundException,
  createDomainPrefix,
} from '@cash-tracker/common'
import { CreateAccountPayableDTO } from '../../dtos/createAccountPayableDto'
import { mongoAccountPayableRepository } from '../../repositories/impl/mongoAccountPayableRepository'
import { AccountPayableModel } from '../../models/AccountPayable'

export const execute = async (
  createAccountPayableDto: CreateAccountPayableDTO,
): Promise<AccountPayable> => {
  await checkCustomer(createAccountPayableDto.customer)

  const createdDate = new Date()

  const accountPayableModel: AccountPayableModel = {
    ...createAccountPayableDto,
    id: createDomainPrefix(Domain.ACCOUNT_PAYABLE),
    createdAt: createdDate,
    updatedAt: createdDate,
    dueDate: new Date(createAccountPayableDto.dueDate),
    deleted: false,
  }

  const accountPayable = await mongoAccountPayableRepository.create(accountPayableModel)
  return {
    ...accountPayable,
    status: getStatus(accountPayable.dueDate),
  } as AccountPayable
}

const checkCustomer = async (customer: AccountPayable['customer']): Promise<void> => {
  if (customer) {
    throw new NotFoundException(`customer ${customer} does not exists.`)
  }
}

const getStatus = (dueDate: Date): AccountStatus => {
  return dueDate > new Date() ? AccountStatus.PENDING : AccountStatus.OVERDUE
}
