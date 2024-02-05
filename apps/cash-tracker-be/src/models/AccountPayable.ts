import { Domain, DomainId } from '@cash-tracker/common'
import type { ObjectId } from 'mongodb'

export class AccountPayableModel {
  _id?: ObjectId

  id: DomainId[Domain.ACCOUNT_PAYABLE]

  name: string

  description?: string

  customer?: DomainId[Domain.CUSTOMER]

  originalAmount: number

  rebate?: number

  dueDate: Date

  barcode?: string

  createdAt: Date

  updatedAt: Date

  deleted: boolean
}
