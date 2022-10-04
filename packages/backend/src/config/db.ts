import dotenv from 'dotenv'

dotenv.config()
const MONGODB_URL: string = process.env.MONGODB_URL || 'mongodb://127.0.0.1/chatapp'
const SERVER_PORT: number = parseInt(process.env.SERVER_PORT || '5000')

export const config = {
  mongo: {
    url: MONGODB_URL,
  },
  server: {
    port: SERVER_PORT,
  },
}
