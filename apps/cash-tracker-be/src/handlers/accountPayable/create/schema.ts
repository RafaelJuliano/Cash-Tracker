import * as yup from 'yup'

export const createAccountPayableSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string(),
    customer: yup.string(),
    originalAmount: yup.number().required(),
    rebate: yup.number(),
    dueDate: yup.date().required(),
    barcode: yup.string(),
  })
  .noUnknown()
  .required()

export type CreateAccountPayableType = yup.InferType<typeof createAccountPayableSchema>
