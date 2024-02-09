import { UTCDate } from '@date-fns/utc'
import { endOfDay, startOfDay, subDays } from 'date-fns'

export const getUtcDate = (date?: string): Date =>
  date ? new UTCDate(date) : new UTCDate()

export const getEndOfYesterdayUTC = (): Date => endOfDay(subDays(new UTCDate(), 1))
export const getStartOfTodayUTC = (): Date => startOfDay(new UTCDate())
