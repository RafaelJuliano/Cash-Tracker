import * as yup from 'yup'
import { Domain, DomainPrefix } from '@cash-tracker/common'

const uuidReg = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

export const yupDomainIdTest = (
  domain: Domain,
): yup.TestConfig<string, yup.AnyObject> => {
  return {
    name: 'Domain Id test',
    message: '${path} must be a valid domain id',
    test: value => {
      if (value && typeof value === 'string') {
        const [prefix, id] = value.split('_')
        return prefix === DomainPrefix[domain] && uuidReg.test(id)
      }
      return true
    },
  }
}

export const yupDateTest = (): yup.TestConfig<string, yup.AnyObject> => {
  return {
    name: 'valid date test',
    message: '${path} must be a valid date string',
    test: value => {
      if (value && typeof value === 'string') {
        return !isNaN(new Date(value).getTime())
      }
      return true
    },
  }
}
