import type { AccountStatus, Domain, DomainId } from '@cash-tracker/common'

export interface ListAccountPayableDto {
  name?: string
  amountLessThan?: number
  amountGreaterThan?: number
  fromDueDate?: string
  toDueDate?: string
  fromCreatedDate?: string
  toCreatedDate?: string
  barcode?: string
  status?: AccountStatus
  customerId?: DomainId[Domain.CUSTOMER]
  showDeleted: boolean
  limit: number
  offset: number
}
