import type { AccountPayableModel } from '../models/AccountPayable'

export interface AccountPayableRepository {
  create: (accountPayableModel: AccountPayableModel) => Promise<AccountPayableModel>
}
