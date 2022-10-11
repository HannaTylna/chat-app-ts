import { User } from '@chat-app/shared'
import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
})

const UserModel = model<User>('User', userSchema)

export const createNewUser = async (user: User): Promise<void> => {
  const newUser = new UserModel(user)
  newUser.save()
}
