import { APIGatewayProxyEventV2 } from 'aws-lambda'
import {
  Response,
  httpMidiffy,
  validateQueryStringParameters,
  withXApiKey,
} from '@cash-tracker/common'
import { execute } from '../../../useCases/accountsPayables/list'
import { listAccountPayableSchema } from './schema'
import { ListAccountPayableDto } from '../../../dtos/listAccountPayableDto'

const handler = async (event: APIGatewayProxyEventV2) => {
  const filters = listAccountPayableSchema.cast(event.queryStringParameters || {})

  const response = await execute(filters as ListAccountPayableDto)

  return Response.success(response)
}

export const main = httpMidiffy(handler)
  .use(withXApiKey(process.env.X_API_KEY))
  .use(validateQueryStringParameters(listAccountPayableSchema))
