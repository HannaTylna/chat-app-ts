import { Request, Response } from 'express'
import { createNewUser } from '../services/user.services'

export const addANewUser = async (req: Request, res: Response) => {
  res.send(await createNewUser(req.body))
}
