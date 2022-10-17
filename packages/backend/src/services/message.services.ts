import { MessageModel } from '../models/messages'
import { UserModel } from '../models/users'
import { Message } from '@chat-app/shared'

export const allMessages = async (): Promise<Message[]> => {
  return MessageModel.find().populate('sender').exec()
}

export const createANewMessage = async (
  currentUser: string | undefined,
  message: string,
): Promise<void> => {
  const getuser = await UserModel.findOne({ username: currentUser })
  console.log(getuser?._id)

  const newToDo = new MessageModel({ text: message, sender: getuser?._id })
  await newToDo.save()
}
