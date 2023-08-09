import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { Response, httpMidiffy, withXApiKey } from '@cash-tracker/common'
import { ObjectId } from 'mongodb'
import { getCollection } from '../../providers/mongoDbProvider'

type HelloWorld = { _id: ObjectId; message: string }

const handler = async (event: APIGatewayProxyEventV2) => {
  const collectionName = 'hello-world'
  const helloWorldCollection = getCollection<HelloWorld>(collectionName)
  const query = { message: { $exists: true } }
  const records = await helloWorldCollection
    .find(query, {
      projection: {
        message: 1,
      },
    })
    .toArray()

  const [{ message }] = records

  return Response.success({
    message,
  })
}

export const main = httpMidiffy(handler).use(withXApiKey(process.env.X_API_KEY))
