import express, { Application, json, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { setUpMongoDb } from './models/common'

dotenv.config()
const app: Application = express()
const port: number = parseInt(process.env.SERVER_PORT || '5000')
const mongoUrl: string = process.env.MONGODB_URL || 'mongodb:127.0.0.1/chatapp'
app.use(cors())
app.use(json())

app.get('/', (req: Request, res: Response) => {
  res.send('Chat app📨')
})
app.listen(port, async function () {
  await setUpMongoDb(mongoUrl)
  console.log(`App is listening on port ${port} !`)
})
