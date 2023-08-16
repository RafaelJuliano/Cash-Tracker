import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { withXApiKey } from '../withXApiKey'
import { createContext, createRequest, testMidiffy } from './testUtils'
import { UnauthorizedException } from '../../../exceptions'

describe('middlewares - withXApiKey', () => {
  const handler = (_event: APIGatewayProxyEventV2): Promise<unknown> => {
    return Promise.resolve(true)
  }

  const context = createContext()

  const xApiKey = 'the-cake-is-a-lie'

  const main = testMidiffy(handler, withXApiKey(xApiKey))

  it('should throw UnauthorizedException if x-api-key is undefined', () => {
    const request = createRequest()
    expect(main(request, context)).rejects.toThrow(UnauthorizedException)
  })

  it('should throw UnauthorizedException if x-api-key is invalid', () => {
    const request = createRequest({
      headers: {
        'x-api-key': 'invalid',
      },
    })
    expect(main(request, context)).rejects.toThrow(UnauthorizedException)
  })

  it('should not throw UnauthorizedException', async () => {
    const request = createRequest({
      headers: {
        'x-api-key': xApiKey,
      },
    })

    expect(await main(request, context)).toBeTruthy()
  })
})
