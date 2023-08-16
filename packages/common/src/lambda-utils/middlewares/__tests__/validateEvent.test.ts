import * as yup from 'yup'
import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { createContext, createRequest, testMidiffy } from '../../../utils/testUtils'
import { validateEvent } from '../validateEvent'
import { HttpException } from '../../../exceptions'
import { BadRequestException } from '../../../exceptions/BadRequestException'

describe('middlewares - validateEvent', () => {
  const handler = (_event: APIGatewayProxyEventV2): Promise<unknown> => {
    return Promise.resolve()
  }

  const context = createContext()

  const schema = yup.object({
    body: yup.string().required(),
    headers: yup.object().required(),
    queryStringParameters: yup.object().required(),
    pathParameters: yup.object().required(),
  })

  const main = testMidiffy(handler, validateEvent(schema))

  const validate = async (event: APIGatewayProxyEventV2, errors?: unknown) => {
    try {
      await main(event, context)
      return true
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.statusCode).toBe(400)
      expect(error.body).toStrictEqual({
        message: 'Bad Request.',
        errors,
      })
    }
  }

  it('should validate an event', async () => {
    const request = createRequest({
      body: '{}',
      queryStringParameters: {},
      pathParameters: {},
      headers: {},
    })
    expect(await validate(request)).toBeTruthy()
  })

  it('should validate an invalid event', async () => {
    const request = createRequest()
    delete request.headers
    await validate(request, [
      'body is a required field',
      'headers is a required field',
      'queryStringParameters is a required field',
      'pathParameters is a required field',
    ])
  })
})
