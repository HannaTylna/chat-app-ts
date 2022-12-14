import { Request, Response } from 'express'
import { allMessages, createANewMessage } from '../services/message.services'
import { JwtRequest } from '../middleware/auth'

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    res.status(200)
    res.json(await allMessages())
  } catch (error) {
    res.status(200).json(error)
  }
}

export const newMessage = async (req: JwtRequest<string>, res: Response) => {
  try {
    const message = req.body.text
    const currentUser = req.jwt?.username
    await createANewMessage(currentUser, message)
    res.status(200).json({ message, currentUser })
  } catch (error) {
    res.status(400).json(error)
  }
}
