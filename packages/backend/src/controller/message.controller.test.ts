import { getAllMessages } from './message.controller'
import { Request, Response } from 'express'

jest.mock('../services/message.services', () => {
  const originalModule = jest.requireActual('../services/message.services')
  const expectedMessages = [
    {
      sender: 'abuDynamit',
      text: 'Allahu Akhbar!! Buufff',
    },
    {
      sender: 'someDude',
      text: 'Is this heaven',
    },
  ]
  return {
    __esModule: true,
    originalModule,
    allMessages: () => Promise.resolve(expectedMessages),
  }
})

describe('get all messages', () => {
  test('should return all messages', async () => {
    let responseObject = {}
    const request = {}
    const response: Partial<Response> = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result
      }),
      status: jest.fn(),
    }

    const expectedMessages = [
      {
        sender: 'abuDynamit',
        text: 'Allahu Akhbar!! Buufff',
      },
      {
        sender: 'someDude',
        text: 'Is this heaven',
      },
    ]
    await getAllMessages(request as Request, response as Response)
    expect(responseObject).toEqual(expectedMessages)
  })
})
