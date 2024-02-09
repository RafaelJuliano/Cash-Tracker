import {
  AccountPayable,
  AccountStatus,
  getUtcDate,
  getEndOfYesterdayUTC,
  getStartOfTodayUTC,
} from '@cash-tracker/common'
import { mongoAccountPayableRepository } from '../../repositories'
import { getAccountStatus } from '../../utils/accountUtils'
import { ListAccountPayableDto } from '../../dtos/listAccountPayableDto'

export const execute = async (
  listAccountDto: ListAccountPayableDto,
): Promise<Array<AccountPayable>> => {
  const filters = handleStatusFilter({ ...listAccountDto })

  const list = await mongoAccountPayableRepository.list(filters)

  return list.map(accountPayable => ({
    ...accountPayable,
    status: getAccountStatus(accountPayable.dueDate),
  }))
}

const handleStatusFilter = (filters: ListAccountPayableDto): ListAccountPayableDto => {
  if (filters.status) {
    const yesterday = getEndOfYesterdayUTC()
    const today = getStartOfTodayUTC()

    if (filters.status === AccountStatus.OVERDUE) {
      filters.toDueDate =
        getUtcDate(filters.toDueDate) < yesterday
          ? filters.toDueDate
          : yesterday.toISOString()
    }

    if (filters.status === AccountStatus.PENDING) {
      filters.fromDueDate =
        getUtcDate(filters.fromDueDate) > today ? filters.fromDueDate : today.toString()
    }
  }

  return filters
}
