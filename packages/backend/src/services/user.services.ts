import { createUser } from '../models/users'
import { User } from '@chat-app/shared'

export const saveUser = async (user: User): Promise<User | undefined> => {
  try {
    if (user.name == '' || user.password == '') {
      throw new Error('Invalid name input!')
    }
    await createUser(user)
    return user
  } catch (err) {
    console.log(err)
  }
}
