import { User } from '@chat-app/shared'
import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
})

userSchema.pre<User>('save', async function (next) {
  const hashedpassword = await bcrypt.hash(this.password, 10)
  this.password = hashedpassword
  next()
})

export const UserModel = model<User>('User', userSchema)

export const createUser = async (user: User): Promise<void> => {
  const newModel = new UserModel(user)
  newModel.save()
}
