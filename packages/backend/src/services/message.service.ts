import { Message } from '@chat-app/shared'
import { postMessage } from '../models/messages'

export const registerMessage = async (message: Message): Promise<void> => {
  if (message.text == '' || !message.text) {
    throw new Error('Enter username')
  }

  // TODO message sender is neccessary?
  // message.sender = '63487328525553a7cc539fff'

  await postMessage(message)
}
