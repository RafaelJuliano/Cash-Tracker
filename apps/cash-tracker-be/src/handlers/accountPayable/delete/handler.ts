import { APIGatewayProxyEventV2 } from 'aws-lambda'
import {
  Domain,
  DomainId,
  Response,
  httpMidiffy,
  validatePathParameters,
  withXApiKey,
} from '@cash-tracker/common'
import { execute } from '../../../useCases/accountsPayables/delete'
import { deleteAccountPayableSchema } from './schema'

const handler = async (event: APIGatewayProxyEventV2) => {
  const { id } = deleteAccountPayableSchema.cast(event.pathParameters)
  await execute(id as DomainId[Domain.ACCOUNT_PAYABLE])

  return Response.noContent()
}

export const main = httpMidiffy(handler)
  .use(withXApiKey(process.env.X_API_KEY))
  .use(validatePathParameters(deleteAccountPayableSchema))
