import mongoose from 'mongoose'
import { Message } from '@chat-app/shared'

const messageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    sender: { type: String },
  },
  {
    timestamps: true,
  },
)
export const MessageModel = mongoose.model<Message>('Message', messageSchema)
