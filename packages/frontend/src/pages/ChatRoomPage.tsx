import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import SimpleBar from 'simplebar-react'
import { Message } from '@chat-app/shared/src/messageInterface'
import '../index.css'
import 'simplebar-react/dist/simplebar.min.css'
import { dateTimeFormat } from '../util/datetimeFormat'

interface MessageType {
  text: string
}

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
        .catch((err) => {
          setMessages([])
          setError('failed to fetch messages')
        })
    }, 2000) // TODO back 1000
    return () => clearInterval(interval)
  }, [])

  const sendMessage = async () => {
    setMessage('')
    const msg: MessageType = {
      text: message,
    }
    await axios.post('/api/messages/send', msg)
  }

  function MessageItem(props: { message: any }) {
    const formatedDatetime = dateTimeFormat(props.message.createdAt)
    return (
      <>
        {props.message.sender === currentUser ? (
          <Row className='m-3'>
            <Col className='bg-info rounded' md={{ offset: 8 }}>
              <p className='fw-light bubble-right mt-1'>{props.message.sender}</p>
              <p className='fs-5' style={{ textAlign: 'left' }}>
                {props.message.text}
              </p>
              <small>{formatedDatetime}</small>
            </Col>
          </Row>
        ) : (
          <Row className='m-3'>
            <Col className='bg-light rounded' md={{ span: 4 }}>
              <p className='fw-light bubble-left mt-1'>{props.message.sender}</p>
              <p className='fs-5' style={{ textAlign: 'right' }}>
                {props.message.text}
              </p>
              <small>{formatedDatetime}</small>
            </Col>
          </Row>
        )}
      </>
    )
  }
  return (
    <Container className='chat-main'>
      <SimpleBar style={{ height: 800 }} className='pl-5 pr-5'>
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
