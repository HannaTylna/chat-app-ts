import { Request, Response } from 'express'
import { saveUser } from '../services/user.services'

export const addANewUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    if (!req.body.name || !req.body.password) {
      res.sendStatus(400)
    }
    res.send(await saveUser(req.body))
  } catch (e) {
    res.sendStatus(400)
  }
}
