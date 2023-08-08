import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { Response, httpMidiffy } from '@cash-tracker/common'
import { getCollection } from '../../providers/mongoDbProvider';
import { ObjectId } from 'mongodb';

type HelloWorld = { _id: ObjectId, message: string }

const handler = async (event: APIGatewayProxyEventV2) => {
  const collectionName = 'hello-world'
  const helloWorldCollection = getCollection<HelloWorld>(collectionName)
  const query = { message: { $exists: true } }
  const records = await helloWorldCollection.find(
    query
    , {
      projection: {
        message: 1
      }
    }).toArray()

  const [{ message }] = records

  return Response.success({
    message,
  })
}

export const main = httpMidiffy(handler)