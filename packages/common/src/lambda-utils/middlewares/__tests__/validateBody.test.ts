import * as yup from 'yup'
import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { createContext, createRequest, testMidiffy } from '../../../utils/testUtils'
import { validateBody } from '../validateBody'
import { BadRequestException } from '../../../exceptions/BadRequestException'

describe('middlewares - validateBody', () => {
  const handler = (_event: APIGatewayProxyEventV2): Promise<unknown> => {
    return Promise.resolve()
  }

  const context = createContext()

  const schema = yup.object({
    key: yup.string().required(),
  })

  const main = testMidiffy(handler, validateBody(schema))

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

  it('should validate a json body', async () => {
    const request = createRequest({
      body: '{"key":"string"}',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    expect(await validate(request)).toBeTruthy()
  })

  it('should validate an invalid json body', async () => {
    const request = createRequest({
      body: '{}',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    delete request.headers
    await validate(request, ['key is a required field'])
  })

  it('should validate undefined body', async () => {
    const request = createRequest({
      headers: {
        'Content-Type': 'application/json',
      },
    })
    await validate(request, ['key is a required field'])
  })
})
