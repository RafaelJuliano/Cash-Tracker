import * as yup from 'yup'
import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { createContext, createRequest, testMidiffy } from '../../../utils/testUtils'

import { BadRequestException } from '../../../exceptions/BadRequestException'
import { validatePathParameters } from '../validatePathParameters'

describe('middlewares - validatePathParameters', () => {
  const handler = (_event: APIGatewayProxyEventV2): Promise<unknown> => {
    return Promise.resolve()
  }

  const context = createContext()

  const schema = yup.object({
    key: yup.string().required(),
  })

  const main = testMidiffy(handler, validatePathParameters(schema))

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

  it('should validate query string parameters', async () => {
    const request = createRequest({
      pathParameters: {
        key: 'value',
      },
    })
    expect(await validate(request)).toBeTruthy()
  })

  it('should validate an invalid parameters', async () => {
    const request = createRequest({
      pathParameters: {},
    })
    delete request.headers
    await validate(request, ['key is a required field'])
  })
})
