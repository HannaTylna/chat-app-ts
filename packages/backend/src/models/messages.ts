import { model, Schema } from 'mongoose'
import { Message } from '@chat-app/shared'

const messageSchema = new Schema({
  text: String,
  timeStamp: Date,
  // sender: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
})
const MessageModel = model<Message>('Message', messageSchema)

export const postMessage = async (message: Message): Promise<void> => {
  const newMessage = new MessageModel(message)
  newMessage.save()
}
export const allMessages = async (): Promise<Message[]> => {
  return MessageModel.find().exec()
}
