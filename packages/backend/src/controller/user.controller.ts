import { Request, Response } from 'express'
import { createNewUser } from '../models/users'

export const addANewUser = async (req: Request, res: Response) => {
  res.send(await createNewUser(req.body))
}
