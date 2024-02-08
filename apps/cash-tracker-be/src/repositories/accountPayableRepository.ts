import type { Domain, DomainId } from '@cash-tracker/common'
import type { AccountPayableModel } from '../models/AccountPayable'

export interface AccountPayableRepository {
  create: (accountPayableModel: AccountPayableModel) => Promise<AccountPayableModel>
  findById: (id: DomainId[Domain.ACCOUNT_PAYABLE]) => Promise<AccountPayableModel>
}
