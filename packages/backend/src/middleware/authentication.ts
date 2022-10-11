import { NextFunction, Request, Response } from 'express'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'

export const secret: Secret = process.env.JWT_TOKEN || 'your_jwt_secret'

export interface CustomRequest extends Request {
  token: string | JwtPayload
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer', '')
    if (!token) {
      throw new Error()
    }
    const decoded = jwt.verify(token, secret)
    ;(req as CustomRequest).token = decoded
    next()
  } catch (err) {
    res.status(401).send('Please authenticate!')
  }
}
