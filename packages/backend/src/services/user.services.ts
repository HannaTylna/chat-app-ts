import { UserModel } from '../models/users'
import { User } from '@chat-app/shared'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secret: string = process.env.JWT_TOKEN || 'blablabla'

export const createNewUser = async (user: User): Promise<void> => {
  const newUser = new UserModel(user)
  newUser.save()
}

export const loginUser = async (user: User): Promise<unknown> => {
  const existUser = await UserModel.findOne({ user: user.name })
  if (!existUser) throw new Error('wrong password')
  console.log(existUser)
  const isMatch = bcrypt.compareSync(user.password, existUser.password)
  console.log(isMatch)
  if (!isMatch) throw new Error('wrong password')
  const token = jwt.sign({ id: existUser._id?.toString(), username: existUser.name }, secret, {
    expiresIn: '1800',
  })
  return { token }
}
