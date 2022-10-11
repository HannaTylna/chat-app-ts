import { UserModel } from '../models/users'
import { User } from '@chat-app/shared'

export const createNewUser = async (user: User): Promise<void> => {
  const newUser = new UserModel(user)
  newUser.save()
}
