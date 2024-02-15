import type { Domain, DomainId } from '@cash-tracker/common'
import type { AccountPayableModel } from '../models/AccountPayable'
import { ListAccountPayableDto } from '../dtos/listAccountPayableDto'

export interface AccountPayableRepository {
  create: (accountPayableModel: AccountPayableModel) => Promise<AccountPayableModel>
  findById: (id: DomainId[Domain.ACCOUNT_PAYABLE]) => Promise<AccountPayableModel>
  find: (filter: ListAccountPayableDto) => Promise<Array<AccountPayableModel>>
  delete: (id: DomainId[Domain.ACCOUNT_PAYABLE]) => Promise<void>
}
