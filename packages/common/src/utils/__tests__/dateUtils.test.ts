import { parseISO } from 'date-fns/parseISO'
import { getUtcDate } from '../dateUtils'

describe('Utils - dateUtils', () => {
  describe('safeParse', () => {
    jest.useFakeTimers()

    it('Should return today as parse ISO date', () => {
      expect(getUtcDate()).toStrictEqual(parseISO(new Date().toISOString()))
    })

    it('Should return custom date as parse ISO date', () => {
      const date = '2024-02-05T03:00:00.000+03:00'
      expect(getUtcDate(date)).toStrictEqual(new Date('2024-02-05T00:00:00.000Z'))
    })
  })
})
