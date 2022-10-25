import React, { useState, useEffect } from 'react'
import { Message } from '../../../shared/src/messageInterface'
import axios from 'axios'

interface messageType {
  text: string
}

axios.interceptors.request.use((config) => {
  if (!config?.headers) {
    config.headers = {}
  }
  const jwt = localStorage.getItem('chatapp')
  if (jwt) {
    config.headers['authorization'] = `Bearer ${jwt}`
  }
  return config
})

const fetchMessages = async (): Promise<Message[]> => {
  const response = await axios.get<Message[]>(`${process.env.REACT_APP_CHAT_API}/api/messages/`)
  return response.data
}

export default function ChatRoomPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    setInterval(() => {
      fetchMessages()
        .then(setMessages)
        .catch((error) => {
          setMessages([])
          setError('failed to fetch messages')
        })
    }, 1000)
  }, [])

  const sendMessage = async () => {
    setMessage('')
    const msg: messageType = {
      text: message,
    }
    await axios.post(`${process.env.REACT_APP_CHAT_API}/api/messages/send`, msg)
  }

  return (
    <div>
      <div>
        {messages.map((item) => {
          return (
            <div key={item._id}>
              <i>
                <span>{item.sender}:</span>
              </i>
              <span>{item.text}</span>
            </div>
          )
        })}
      </div>
      <div>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  )
}
