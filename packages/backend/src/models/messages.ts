import { model, Schema } from 'mongoose'
import { Message } from '@chat-app/shared'

const messageSchema = new Schema({
  text: String,
  timeStamp: Date,
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})
export const MessageModel = model<Message>('Message', messageSchema)
