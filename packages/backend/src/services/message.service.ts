import { Message } from '@chat-app/shared'
import { allMessages, postMessage } from '../models/messages'

export const registerMessage = async (message: Message, userId: string): Promise<Message[]> => {
  if (message.text == '' || !message.text) {
    throw new Error('Enter username')
  }

  message.sender = userId
  console.log('message from service', message)
  await postMessage(message)
  return await allMessages()
}
