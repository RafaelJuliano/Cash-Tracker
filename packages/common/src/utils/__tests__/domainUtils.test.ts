import { Domain, DomainPrefix } from '../../domain'
import { createDomainPrefix } from '../domainUtils'

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('1234'),
}))

describe('Utils - domainUtils', () => {
  describe('createDomainPrefix', () => {
    it.each(Object.values(Domain))('should created a valid id', domain => {
      expect(createDomainPrefix(domain)).toBe(`${DomainPrefix[domain]}_1234`)
    })
  })
})
