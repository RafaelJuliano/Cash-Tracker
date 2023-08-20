import type { ObjectId } from 'mongodb'
import type { Domain, DomainId } from './Domain'

export enum AccountStatus {
  PENDING = 'pending',
  OVERDUE = 'overdue',
  PAID = 'paid',
}

export interface Account {
  _id?: ObjectId
  id: DomainId[Domain.ACCOUNT_PAYABLE]
  name: string
  status: AccountStatus
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

export interface AccountPayable extends Account { }
