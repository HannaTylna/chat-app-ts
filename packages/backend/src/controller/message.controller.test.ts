import { describe, test, expect } from '@jest/globals'
import mongoose from 'mongoose'
import { allMessages } from '../services/message.services'
describe('get all messages from database', () => {
  beforeAll(async () => {
    const mongoUrl: string = process.env.MONGODB_URL || 'mongodb://localhost:27017/chatapp'
    await mongoose.connect(mongoUrl)
  })
  test('Get all messages', async () => {
    const messages = await allMessages()
    expect(messages).toEqual(expect.arrayContaining(messages))
  })
  afterAll(async () => {
    mongoose.disconnect()
  })
})
