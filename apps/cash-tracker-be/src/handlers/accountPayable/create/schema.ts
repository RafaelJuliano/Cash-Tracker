import { Domain, yup } from '@cash-tracker/common'
import { yupDateTest, yupDomainIdTest } from '../../shared/schema'

export const createAccountPayableSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string(),
    customer: yup.string().test(yupDomainIdTest(Domain.CUSTOMER)),
    originalAmount: yup.number().required(),
    rebate: yup.number(),
    dueDate: yup.string().test(yupDateTest()).required(),
    barcode: yup.string(),
  })
  .noUnknown()
  .required()
