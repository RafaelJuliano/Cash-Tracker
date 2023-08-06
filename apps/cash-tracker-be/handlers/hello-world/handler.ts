import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { Response } from '@cash-tracker/common'

const handler = async (event: APIGatewayProxyEventV2) => {
  return Response.success({
    message: 'Hello World from lambda!'
  })
}

export const main = handler
