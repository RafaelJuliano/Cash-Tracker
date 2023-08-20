import type { Domain, DomainId } from '@cash-tracker/common'

export interface CreateAccountPayableDTO {
  name: string
  description?: string
  customer?: DomainId[Domain.CUSTOMER]
  originalAmount: number
  rebate?: number
  dueDate: string
  barcode?: string
}
