import express, { Response, Request } from 'express'

const route = express.Router()
route.get('/', (req: Request, res: Response) => {
  res.send('hellow')
})
export default route
