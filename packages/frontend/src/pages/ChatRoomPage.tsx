import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import SimpleBar from 'simplebar-react'
import { Message } from '@chat-app/shared/src/messageInterface'
import '../index.css'
import 'simplebar-react/dist/simplebar.min.css'
import MessageList from '../components/MessageList'

export default function ChatRoomPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [currentUser, setCurrentUser] = useState<string>('')

  const getCurrentUser = async (): Promise<void> => {
    const response = await axios.get('/api/users/userInfo')
    setCurrentUser(response.data.username)
  }

  const fetchMessages = async (): Promise<Message[]> => {
    const response = await axios.get<Message[]>('/api/messages/')
    return response.data
  }

  useEffect(() => {
    getCurrentUser()
    const interval = setInterval(() => {
      fetchMessages()
        .then(setMessages)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((err) => {
          setMessages([])
          setError('failed to fetch messages')
        })
    }, 2000) // TODO back 1000
    return () => clearInterval(interval)
  }, [])

  const sendMessage = async (): Promise<void> => {
    setMessage('')
    const msg: Message = {
      text: message,
      createdAt: new Date().toString(),
      sender: currentUser,
    }
    await axios.post('/api/messages/send', msg)
  }
  return (
    <Container className='chat-main'>
      <SimpleBar style={{ height: 800 }} className='pl-5 pr-5'>
        <MessageList messages={messages} />
      </SimpleBar>

      <Row>
        <Col>
          {error && error}
          <InputGroup className='mb-3'>
            <Form.Control
              placeholder='What are you thinking....'
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant='danger' onClick={sendMessage}>
              SEND
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  )
}
