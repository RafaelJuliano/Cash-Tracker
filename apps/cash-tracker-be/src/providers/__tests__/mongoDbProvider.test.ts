import { mocked } from 'jest-mock'
import { MongoClient } from 'mongodb'
import { getCollection } from '../mongoDbProvider'

jest.mock('mongodb')

describe('mongoDbProvider', () => {
  const mockedCollectionFn = jest.fn()
  const mockedDbFn = jest.fn().mockImplementation(() => {
    return {
      collection: mockedCollectionFn
    }
  })

  const createMockedMongoClient = () => {
    return jest.fn().mockImplementation(() => {
      return {
        db: mockedDbFn
      }
    })
  }

  it('should provide a collection twice instantiating db one time', () => {
    mocked(MongoClient).mockImplementation(createMockedMongoClient())
    const collectionName = 'collecetion'
    getCollection(collectionName)
    getCollection(collectionName)
    expect(mockedDbFn).toHaveBeenCalledTimes(1)
    expect(mockedCollectionFn).toHaveBeenCalledTimes(2)
    expect(mockedCollectionFn).toHaveBeenCalledWith(collectionName)
  })
})