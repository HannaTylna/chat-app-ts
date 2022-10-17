import { Request, Response } from 'express'
import { allMessages, createANewMessage } from '../services/message.services'
import { JwtRequest } from '../middleware/auth'

export const getAllMessages = async (req: Request, res: Response) => {
  res.send(await allMessages())
}

export const newMessage = async (req: JwtRequest<string>, res: Response) => {
  const currentUser = req.jwt?.username
  const newMessage = await createANewMessage(currentUser, req.body.text)
  res.json({ newMessage, currentUser })
}
