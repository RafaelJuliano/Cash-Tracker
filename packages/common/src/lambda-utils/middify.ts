import middy, { MiddlewareObj, Request } from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpCors from '@middy/http-cors'
import type { APIGatewayProxyEventV2, APIGatewayProxyResult } from 'aws-lambda'
import { handleUnknowErrors } from './middlewares'

export type Middleware = MiddlewareObj<APIGatewayProxyEventV2, APIGatewayProxyResult>

export type HandlerRequest = Request<APIGatewayProxyEventV2, APIGatewayProxyResult>

export const httpMidiffy = (
  handler: (event: APIGatewayProxyEventV2) => Promise<unknown>,
) => {
  return middy()
    .handler(handler)
    .use(httpCors())
    .use(httpJsonBodyParser())
    .use(handleUnknowErrors())
}
