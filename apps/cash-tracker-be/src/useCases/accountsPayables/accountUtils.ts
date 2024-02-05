import startOfDay from 'date-fns/startOfDay'
import { AccountStatus, getUtcDate } from '@cash-tracker/common'

export const getAccountStatus = (dueDate: Date): AccountStatus => {
  return dueDate >= startOfDay(getUtcDate())
    ? AccountStatus.PENDING
    : AccountStatus.OVERDUE
}
