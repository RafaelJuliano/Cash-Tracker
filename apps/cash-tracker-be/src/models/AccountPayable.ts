import type { ObjectId } from 'mongodb'

export class AccountPayableModel {
  _id?: ObjectId

  id: string

  name: string

  description?: string

  customer?: string

  originalAmount: number

  rebate?: number

  dueDate: Date

  barcode?: string

  createdAt: Date

  updatedAt: Date

  deleted: boolean
} 