import express, { Application, json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { setUpMongoDb } from './models/common'
import router from './routes/index'

dotenv.config()
const app: Application = express()
const port: number = parseInt(process.env.SERVER_PORT || '5000')
const mongoUrl: string = process.env.MONGODB_URL || 'mongodb://localhost:27017/chatapp'
app.use(cors())
app.use(json())

// app.get('/', (req: Request, res: Response) => {
//   res.send('KIKIS EXPRESS CHAT APP📨')
// })

app.use('/api', router)

app.listen(port, async function () {
  await setUpMongoDb(mongoUrl)
  console.log(`App is listening on port ${port} !`)
})
