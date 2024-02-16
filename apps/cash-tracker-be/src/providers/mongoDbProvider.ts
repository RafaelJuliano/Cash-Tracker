import { MongoClient } from 'mongodb'
import type { Db, Collection } from 'mongodb'

let db: Db

const initializeDatabase = (): void => {
  const client = new MongoClient(process.env.MONGO_DB_URI)
  db = client.db(process.env.MONGO_DATABASE)
}

const getDatabase = (): Db => {
  if (!db) initializeDatabase()
  return db
}

export const getCollection = <T>(collectionName: string): Collection<T> => {
  return getDatabase().collection(collectionName)
}
