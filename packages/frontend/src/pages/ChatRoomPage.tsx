import React, { useState, useEffect } from 'react'
import { Message } from '../../../shared/src/messageInterface'
import axios from 'axios'
import { Col, Container, Row } from 'react-bootstrap'

interface messageType {
  text: string
}
axios.defaults.baseURL = process.env.REACT_APP_CHAT_API || 'http://localhost:4000'
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
  const response = await axios.get<Message[]>('/api/messages/')
  return response.data
}

export default function ChatRoomPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | undefined>()

  console.log(messages)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchMessages()
  //       .then(setMessages)
  //       .catch((error) => {
  //         setMessages([])
  //         setError('failed to fetch messages')
  //       })
  //   }, 1000000) // TODO back 1000
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    fetchMessages()
      .then(setMessages)
      .catch((error) => {
        setMessages([])
        setError('failed to fetch messages')
      })
  }, [])

  const sendMessage = async () => {
    setMessage('')
    const msg: messageType = {
      text: message,
    }
    await axios.post('/api/messages/send', msg)
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          {messages.map((item) => {
            return (
              <div key={item._id}>
                <i>
                  <span>{item.sender}:</span>
                </i>
                <span>{item.text}</span>
                <span>{item.createdAt}</span>
              </div>
            )
          })}
        </Col>
      </Row>
      <Row className='align-items-end'>
        <Col>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={sendMessage}>send</button>
        </Col>
      </Row>
    </Container>
  )
}
