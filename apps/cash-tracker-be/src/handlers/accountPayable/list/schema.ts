import { AccountStatus, Domain, yup } from '@cash-tracker/common'
import { yupDateTest, yupDomainIdTest } from '../../shared/schema'

export const listAccountPayableSchema = yup
  .object()
  .shape({
    name: yup.string().trim(),
    amountLessThan: yup.number(),
    amountGreaterThan: yup.number(),
    fromDueDate: yup.string().test(yupDateTest()),
    toDueDate: yup.string().test(yupDateTest()),
    fromCreatedDate: yup.string().test(yupDateTest()),
    toCreatedDate: yup.string().test(yupDateTest()),
    barcode: yup.string().trim(),
    status: yup.string().oneOf(Object.values(AccountStatus)),
    customerId: yup.string().test(yupDomainIdTest(Domain.CUSTOMER)),
    showDeleted: yup.boolean().default(false),
    limit: yup.number().default(10),
    offset: yup.number().default(0),
  })
  .noUnknown()
  .required()
