import { User } from '@chat-app/shared'
import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
})

const UserModel = model<User>('User', userSchema)
