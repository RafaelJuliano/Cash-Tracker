import { v4 as uuidv4 } from 'uuid'
import { Domain, DomainPrefix, DomainId } from '../domain'

export const createDomainPrefix = <T extends Domain>(domain: T): DomainId[T] => {
  return `${DomainPrefix[domain]}_${uuidv4()}` as DomainId[T]
}
