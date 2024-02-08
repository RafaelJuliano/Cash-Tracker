import { Domain, yup } from '@cash-tracker/common'
import { yupDomainIdTest } from '../../shared/schema'

export const getAccountPayableSchema = yup
  .object()
  .shape({
    id: yup.string().required().test(yupDomainIdTest(Domain.ACCOUNT_PAYABLE)),
  })
  .noUnknown()
  .required()
