import { getUtcDate, type Domain, type DomainId } from '@cash-tracker/common'
import type { AccountPayableModel } from '../../models/AccountPayable'
import type { AccountPayableRepository } from '../accountPayableRepository'
import { getCollection } from '../../providers/mongoDbProvider'
import { ListAccountPayableDto } from '../../dtos/listAccountPayableDto'

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
  list: async (filters: ListAccountPayableDto): Promise<Array<AccountPayableModel>> => {
    const collection = getCollection<AccountPayableModel>(accountPayableCollection)

    const getOriginalAmountFilter = () => {
      if (filters.amountLessThan || filters.amountGreaterThan) {
        return {
          originalAmount: {
            ...(filters.amountLessThan ? { $lt: Number(filters.amountLessThan) } : {}),
            ...(filters.amountGreaterThan
              ? { $gt: Number(filters.amountGreaterThan) }
              : {}),
          },
        }
      }
      return {}
    }

    const getDueDateFilter = () => {
      if (filters.fromDueDate || filters.toDueDate || filters.status) {
        return {
          dueDate: {
            ...(filters.fromDueDate ? { $gte: getUtcDate(filters.fromDueDate) } : {}),
            ...(filters.toDueDate
              ? {
                  $lte: getUtcDate(filters.toDueDate),
                }
              : {}),
          },
        }
      }
      return {}
    }

    const getCreatedDateFilter = () => {
      if (filters.fromCreatedDate || filters.toCreatedDate) {
        return {
          createdAt: {
            ...(filters.fromCreatedDate
              ? { $gte: getUtcDate(filters.fromCreatedDate) }
              : {}),
            ...(filters.toCreatedDate ? { $lte: getUtcDate(filters.toCreatedDate) } : {}),
          },
        }
      }
      return {}
    }

    const filter = {
      ...(filters.name ? { name: { $regex: new RegExp(filters.name, 'i') } } : {}),
      ...getOriginalAmountFilter(),
      ...getDueDateFilter(),
      ...getCreatedDateFilter(),
      ...(filters.barcode ? { barcode: filters.barcode } : {}),
      ...(filters.customerId ? { customer: filters.customerId } : {}),
      ...(filters.showDeleted === false ? { deleted: false } : {}),
    }

    return collection
      .find(filter)
      .skip(Number(filters.offset) || 0)
      .limit(Number(filters.limit) || 10)
      .toArray()
  },
}
