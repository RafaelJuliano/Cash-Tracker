import { APIGatewayProxyEventV2 } from 'aws-lambda'
import {
  Domain,
  DomainId,
  Response,
  httpMidiffy,
  validatePathParameters,
  withXApiKey,
} from '@cash-tracker/common'
import { execute } from '../../../useCases/accountsPayables/get'
import { getAccountPayableSchema } from './schema'

const handler = async (event: APIGatewayProxyEventV2) => {
  const { id } = getAccountPayableSchema.cast(event.pathParameters)
  const response = await execute(id as DomainId[Domain.ACCOUNT_PAYABLE])

  return Response.success(response)
}

export const main = httpMidiffy(handler)
  .use(withXApiKey(process.env.X_API_KEY))
  .use(validatePathParameters(getAccountPayableSchema))
