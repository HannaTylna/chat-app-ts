import { Request, Response } from 'express'
import { allMessages, createANewMessage } from '../services/message.services'
import { JwtRequest } from '../middleware/auth'

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await allMessages())
  } catch (error) {
    res.status(200).json(error)
  }
}

export const newMessage = async (req: JwtRequest<string>, res: Response) => {
  try {
    const currentUser = req.jwt?.username
    if (req.body.text == '') {
      res.status(400)
    }
    const newMessage = await createANewMessage(currentUser, req.body.text)
    res.status(200).json({ newMessage, currentUser })
  } catch (error) {
    res.status(400).json(error)
  }
}
