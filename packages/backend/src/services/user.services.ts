import { createUser } from '../models/users'
import { User } from '@chat-app/shared'

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
