import { UTCDate } from '@date-fns/utc'
import { endOfDay, startOfDay, subDays } from 'date-fns'
import { getEndOfYesterdayUTC, getStartOfTodayUTC, getUtcDate } from '../dateUtils'

describe('Utils - dateUtils', () => {
  describe('getUtcDate', () => {
    it('Should return today as parse ISO date', () => {
      expect(getUtcDate()).toStrictEqual(new UTCDate())
    })

    it('Should return custom date as parse ISO date', () => {
      const date = '2024-02-05T03:00:00.000+03:00'
      expect(getUtcDate(date).toISOString()).toBe('2024-02-05T00:00:00.000Z')
    })
  })

  describe('getEndOfYesterdayUTC', () => {
    it('Should return the proper data', () => {
      expect(getEndOfYesterdayUTC()).toStrictEqual(endOfDay(subDays(new UTCDate(), 1)))
    })
  })

  describe('getStartOfTodayUTC', () => {
    it('Should return the proper data', () => {
      expect(getStartOfTodayUTC()).toStrictEqual(startOfDay(new UTCDate()))
    })
  })
})
