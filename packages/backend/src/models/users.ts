import { User } from '@chat-app/shared'
import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
})

userSchema.pre<User>('save', async function (next) {
  const hashedpassword = await bcrypt.hash(this.password, 10)
  this.password = hashedpassword
  next()
})

export const UserModel = model<User>('User', userSchema)

export const createUser = async (user: User): Promise<void> => {
  const newUser = new UserModel(user)
  const existUser = await UserModel.findOne({ email: newUser.email })
  if (existUser) {
    throw new Error('User already exist')
  }
  newUser.save()
}
