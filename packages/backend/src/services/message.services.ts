import { MessageModel } from '../models/messages'
import { Message } from '@chat-app/shared'

export const allMessages = async (): Promise<Message[]> => {
  return MessageModel.find({}).exec()
}

export const createANewMessage = async (
  currentUser: string | undefined,
  message: string,
): Promise<void> => {
  const newToDo = new MessageModel({ text: message, sender: currentUser })
  await newToDo.save()
}
