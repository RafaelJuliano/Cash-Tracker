import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { Response, httpMidiffy, validateBody, withXApiKey } from '@cash-tracker/common'
import { createAccountPayableSchema } from './schema'
import { execute } from '../../../useCases/accountsPayables/createUseCase'
import { CreateAccountPayableDTO } from '../../../dtos/createAccountPayableDto'

const handler = async (event: APIGatewayProxyEventV2) => {
  const body = createAccountPayableSchema.cast(event.body)
  const response = await execute(body as CreateAccountPayableDTO)

  return Response.success(response)
}

export const main = httpMidiffy(handler)
  .use(withXApiKey(process.env.X_API_KEY))
  .use(validateBody(createAccountPayableSchema))
