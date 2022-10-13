import { createUser, loadUserByUsername } from '../models/users'
import { Credentials, User } from '@chat-app/shared'

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
  return userInfo
}
