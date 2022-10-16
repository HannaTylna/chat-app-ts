import { User } from '@chat-app/shared'
import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

export const UserModel = model<User>('User', userSchema)

export const createUser = async (user: User): Promise<void> => {
  const newUser = new UserModel(user)
  const existUser = await UserModel.findOne({ _id: newUser._id }).exec()
  if (existUser) {
    throw new Error('User already exist')
  }
  newUser.save()
}

export const loadUserByUsername = async (username: string): Promise<User | null> => {
  return await UserModel.findOne({ username: username }).exec()
}
export const loadUser = async (username: string): Promise<string | undefined> => {
  const user = await UserModel.findOne({ username: username }).exec()
  const id: string | undefined = user?._id
  return id
}
