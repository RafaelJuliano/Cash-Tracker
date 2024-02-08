import type { Domain, DomainId } from '@cash-tracker/common'
import type { AccountPayableModel } from '../../models/AccountPayable'
import type { AccountPayableRepository } from '../accountPayableRepository'
import { getCollection } from '../../providers/mongoDbProvider'

const accountPayableCollection = process.env.ACCOUNTS_PAYABLES_COLLECTION

export const mongoAccountPayableRepository: AccountPayableRepository = {
  create: async (
    accountPayableModel: Omit<AccountPayableModel, '_id'>,
  ): Promise<AccountPayableModel> => {
    const collection = getCollection<AccountPayableModel>(accountPayableCollection)

    const res = await collection.insertOne(accountPayableModel)

    return {
      _id: res.insertedId,
      ...accountPayableModel,
    }
  },
  findById: async (
    id: DomainId[Domain.ACCOUNT_PAYABLE],
  ): Promise<AccountPayableModel> => {
    const collection = getCollection<AccountPayableModel>(accountPayableCollection)

    return collection.findOne({
      id,
    })
  },
}
