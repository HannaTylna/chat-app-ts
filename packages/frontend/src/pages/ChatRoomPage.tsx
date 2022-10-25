import React, { useState, useEffect } from 'react'
import { Message } from '../../../shared/src/messageInterface'
import axios from 'axios'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import SimpleBar from 'simplebar-react'
import '../index.css'
import 'simplebar-react/dist/simplebar.min.css'

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
    }, 2000) // TODO back 1000
    return () => clearInterval(interval)
  }, [])
  const fetchMessages = async (): Promise<Message[]> => {
    const response = await axios.get<Message[]>('/api/messages/')
    return response.data
  }

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
      <>
        {props.message.sender === currentUser ? (
          <Row className='m-1'>
            <Col className='bg-info rounded' md={{ offset: 7 }}>
              <p className='fw-light m-1' style={{ textAlign: 'right' }}>
                {props.message.sender}
              </p>
              <p className='fs-5 m-0' style={{ textAlign: 'left' }}>
                {props.message.text}
              </p>
            </Col>
          </Row>
        ) : (
          <Row className='m-1'>
            <Col className='bg-light rounded' md={{ span: 5 }}>
              <p className='fw-light m-1' style={{ textAlign: 'left' }}>
                {props.message.sender}
              </p>
              <p className='fs-5 m-0' style={{ textAlign: 'right' }}>
                {props.message.text}
              </p>
            </Col>
          </Row>
        )}
      </>
    )
  }
  return (
    <Container className='chat-main'>
      <SimpleBar style={{ height: 500 }} className='pl-5 pr-5'>
        {messages.map((message) => {
          return <MessageItem key={message._id} message={message} />
        })}
      </SimpleBar>

      <Row>
        <Col>
          {error && error}
          <InputGroup>
            <Form.Control
              placeholder='what are you thinking'
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant='danger' onClick={sendMessage}>
              send
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  )
}
