import { AccountStatus, Domain, yup } from '@cash-tracker/common'
import {
  yupDateTest,
  yupDomainIdTest,
  yupNumberStringSchema,
  yupProjectionTest,
} from '../../shared/schema'

export const availableProjecetionFields = [
  'id',
  'name',
  'description',
  'customer',
  'originalAmount',
  'rebate',
  'dueDate',
  'barcode',
  'createdDate',
]

export const listAccountPayableSchema = yup
  .object()
  .shape({
    name: yup.string().trim(),
    amountLessThan: yupNumberStringSchema,
    amountGreaterThan: yupNumberStringSchema,
    fromDueDate: yup.string().test(yupDateTest()),
    toDueDate: yup.string().test(yupDateTest()),
    fromCreatedDate: yup.string().test(yupDateTest()),
    toCreatedDate: yup.string().test(yupDateTest()),
    barcode: yup.string().trim(),
    status: yup.string().oneOf(Object.values(AccountStatus)),
    customerId: yup.string().test(yupDomainIdTest(Domain.CUSTOMER)),
    showDeleted: yup.boolean().default(false),
    limit: yupNumberStringSchema.default(10),
    offset: yupNumberStringSchema.default(0),
    projection: yup.string().test(yupProjectionTest(availableProjecetionFields)),
  })
  .noUnknown()
  .required()
