import { Request, Response } from 'express'
import { loginUser, createNewUser } from '../services/user.services'

export const addANewUser = async (req: Request, res: Response) => {
  res.send(await createNewUser(req.body))
}

export const login = async (req: Request, res: Response) => {
  res.send(await loginUser(req.body))
}
