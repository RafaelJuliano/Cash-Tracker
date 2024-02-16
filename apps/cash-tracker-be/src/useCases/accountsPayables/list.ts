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
): Promise<Array<Partial<AccountPayable>>> => {
  const filters = handleStatusFilter({ ...listAccountDto })

  const list = await mongoAccountPayableRepository.find(filters)

  return list.map(accountPayable => ({
    ...accountPayable,
    ...(!filters.projection || filters.projection.split(',').includes('status')
      ? { status: getAccountStatus(accountPayable.dueDate) }
      : {}),
  }))
}

const handleStatusFilter = (filters: ListAccountPayableDto): ListAccountPayableDto => {
  if (filters.status) {
    const yesterday = getEndOfYesterdayUTC()
    const today = getStartOfTodayUTC()

    if (filters.status === AccountStatus.OVERDUE) {
      filters.toDueDate =
        !!filters.toDueDate && getUtcDate(filters.toDueDate) < yesterday
          ? filters.toDueDate
          : yesterday.toISOString()
    }

    if (filters.status === AccountStatus.PENDING) {
      filters.fromDueDate =
        !!filters.fromDueDate && getUtcDate(filters.fromDueDate) > today
          ? filters.fromDueDate
          : today.toISOString()
    }
  }

  return filters
}
