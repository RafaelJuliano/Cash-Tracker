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

export const yupNumberStringTest = (): yup.TestConfig<string, yup.AnyObject> => {
  return {
    name: 'Digits Only',
    message: '${path} should contain only digits',
    test: (value: string) => !value || /^\d+$/.test(value),
  }
}

export const yupNumberStringSchema = yup
  .mixed()
  .test(yupNumberStringTest())
  .transform(value => Number(value))

export const yupProjectionTest = (
  fields: string[],
): yup.TestConfig<string, yup.AnyObject> => {
  return {
    name: 'Projection',
    message: `${'${path}'} should contain only the following values: ${fields.join(
      ', ',
    )}`,
    test: (value: string) => {
      if (value) {
        const keys = value.split(',')
        let noInvalidKeys = true

        keys.forEach(key => {
          if (!fields.includes(key)) {
            noInvalidKeys = false
          }
        })

        return noInvalidKeys
      }
      return true
    },
  }
}
