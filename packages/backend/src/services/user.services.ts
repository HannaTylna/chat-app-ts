import { createUser, loadUserByUsername } from '../models/users'
import { Credentials, User } from '@chat-app/shared'
import bcrypt from 'bcrypt'

export const registerUser = async (user: User): Promise<void> => {
  if (user.username == '' || !user.username) {
    throw new Error('Enter username')
  }
  if (user.email == '' || !user.email) {
    throw new Error('Enter email')
  }
  if (user.password == '' || !user.password) {
    throw new Error('Enter password')
  }
  await createUser(user)
}

export const login = async (credentials: Credentials): Promise<User | null> => {
  const userInfo = await loadUserByUsername(credentials.username)
  if (userInfo && (await bcrypt.compare(credentials.password, userInfo.password))) {
    return userInfo
  } else {
    return null
  }
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
