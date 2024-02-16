import { getUtcDate } from '@cash-tracker/common'

type RangeFilter = {
  [key: string]: {
    $gte?: string | number | Date
    $lte?: string | number | Date
  }
}

export const getRangeFilter = <T extends object>(
  attribute: keyof T,
  from: string | number | undefined,
  to: string | number | undefined,
  type: 'date' | 'number' | 'string' = 'string',
): RangeFilter => {
  const formatedValue = {
    date: (value: string) => getUtcDate(value),
    number: (value: string) => Number(value),
    string: (value: string) => value,
  }

  if (from || to) {
    return {
      [attribute]: {
        ...(from ? { $gte: formatedValue[type](String(from)) } : {}),
        ...(to ? { $lte: formatedValue[type](String(to)) } : {}),
      },
    }
  }

  return {}
}

export const getProjection = (filters: { projection?: string }): Record<string, 1> => {
  if (filters.projection) {
    const keys = filters.projection.split(',')
    const project = {}

    keys.forEach(key => {
      project[key] = 1
    })
    return project
  }
  return {}
}
