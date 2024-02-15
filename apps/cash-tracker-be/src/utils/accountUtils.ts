import { AccountStatus, getStartOfTodayUTC } from '@cash-tracker/common'

export const getAccountStatus = (dueDate: Date): AccountStatus => {
  return dueDate >= getStartOfTodayUTC() ? AccountStatus.PENDING : AccountStatus.OVERDUE
}
