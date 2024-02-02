import { parseISO } from 'date-fns'

export const getUtcDate = (date: string = new Date().toISOString()): Date =>
  parseISO(date)
