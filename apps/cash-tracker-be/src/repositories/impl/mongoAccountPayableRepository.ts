import type { Domain, DomainId } from '@cash-tracker/common'
import type { AccountPayableModel } from '../../models/AccountPayable'
import type { AccountPayableRepository } from '../accountPayableRepository'
import { getCollection } from '../../providers/mongoDbProvider'
import { ListAccountPayableDto } from '../../dtos/listAccountPayableDto'
import { getProjection, getRangeFilter } from './mongoUtils'

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

    return collection.findOne(
      {
        id,
      },
      { projection: { _id: 0 } },
    )
  },
  find: async (
    filters: ListAccountPayableDto,
  ): Promise<Array<Partial<AccountPayableModel>>> => {
    const collection = getCollection<AccountPayableModel>(accountPayableCollection)

    const filter = {
      ...(filters.name ? { name: { $regex: new RegExp(filters.name, 'i') } } : {}),
      ...getRangeFilter(
        'originalAmount',
        filters.amountGreaterThan,
        filters.amountLessThan,
        'number',
      ),
      ...getRangeFilter('dueDate', filters.fromDueDate, filters.toDueDate, 'date'),
      ...getRangeFilter(
        'createdAt',
        filters.fromCreatedDate,
        filters.toCreatedDate,
        'date',
      ),
      ...(filters.barcode ? { barcode: filters.barcode } : {}),
      ...(filters.customerId ? { customer: filters.customerId } : {}),
      ...(filters.showDeleted === false ? { deleted: false } : {}),
    }

    return collection
      .find(filter, { projection: { _id: 0, ...getProjection(filters) } })
      .skip(Number(filters.offset) || 0)
      .limit(Number(filters.limit) || 10)
      .toArray()
  },
  delete: async (id: DomainId[Domain.ACCOUNT_PAYABLE]): Promise<void> => {
    const collection = getCollection<AccountPayableModel>(accountPayableCollection)

    await collection.deleteOne({ id })
  },
}
