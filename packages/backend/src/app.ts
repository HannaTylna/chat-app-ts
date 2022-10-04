import express, { Application, json, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
app.use(cors())
app.use(json())

app.get('/', (req: Request, res: Response) => {
  res.send('Chat app📨')
})
app.listen(config.server.port, async function () {
  await mongoose.connect(config.mongo.url).then(() => {
    console.log('Database connected!')
  })
  // .catch(error){
  //   console.log(error)
  // }
  console.log(`App is listening on port ${config.server.port} !`)
})
