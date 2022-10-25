import React, { useState, useEffect } from 'react'
import { Message } from '../../../shared/src/messageInterface'
import axios from 'axios'
import { Col, Container, Row } from 'react-bootstrap'
import SimpleBar from 'simplebar-react'
import '../index.css'

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

export default function ChatRoomPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [currentUser, setCurrentUser] = useState<string>('')

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages()
        .then(setMessages)
        .catch((error) => {
          setMessages([])
          setError('failed to fetch messages')
        })
    }, 5000) // TODO back 1000
    return () => clearInterval(interval)
  }, [])
  const fetchMessages = async (): Promise<Message[]> => {
    const response = await axios.get<Message[]>('/api/messages/')
    return response.data
  }
  // useEffect(() => {
  //   fetchMessages()
  //     .then(setMessages)
  //     .catch((error) => {
  //       setMessages([])
  //       setError('failed to fetch messages')
  //     })
  // }, [])

  const sendMessage = async () => {
    setMessage('')
    const msg: messageType = {
      text: message,
    }
    const response = await axios.post('/api/messages/send', msg)
    setCurrentUser(response.data.currentUser)
  }

  const MessageItem = (props: { message: any }) => {
    return (
      <div className={props.message.sender === currentUser ? 'right' : 'left'}>
        <span>{props.message.text}</span>
        <p>sender:{props.message.sender}</p>
      </div>
    )
  }
  return (
    <Container>
      <SimpleBar style={{ height: '80%' }}>
        {messages.map((message) => {
          return <MessageItem key={message._id} message={message} />
        })}
      </SimpleBar>

      <Row>
        <Col>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={sendMessage}>send</button>
        </Col>
      </Row>
    </Container>
  )
}
