import { AccountPayable, Domain, DomainId, NotFoundException } from '@cash-tracker/common'
import { mongoAccountPayableRepository } from '../../repositories'
import { getAccountStatus } from './accountUtils'

export const execute = async (
  id: DomainId[Domain.ACCOUNT_PAYABLE],
): Promise<AccountPayable> => {
  const accountPayable = await mongoAccountPayableRepository.findById(id)

  if (!accountPayable) {
    throw new NotFoundException(`account payable with id:${id} does not exists.`)
  }
  return {
    ...accountPayable,
    status: getAccountStatus(accountPayable.dueDate),
  }
}
