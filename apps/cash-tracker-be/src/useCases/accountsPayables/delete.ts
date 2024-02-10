import { Domain, DomainId, NotFoundException } from '@cash-tracker/common'
import { mongoAccountPayableRepository } from '../../repositories'

export const execute = async (id: DomainId[Domain.ACCOUNT_PAYABLE]): Promise<void> => {
  const accountPayable = await mongoAccountPayableRepository.findById(id)

  if (!accountPayable) {
    throw new NotFoundException(`account payable with id:${id} does not exists.`)
  }

  await mongoAccountPayableRepository.delete(id)
}
