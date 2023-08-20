import { AccountPayable } from '@cash-tracker/common'
import { CreateAccountPayableDTO } from '../../dtos/createAccountPayableDto'

export const execute = (
  createAccountPayableDto: CreateAccountPayableDTO,
): Promise<AccountPayable> => {
  throw new Error('method not implemented')
}
