import React, { useState, useEffect } from 'react'
import { Message, User } from '@chat-app/shared'
import axios from 'axios'
import MessageInput from '../components/MessageInput'
import { P } from '../styles/StyledParagraph'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { Col, Container, Row } from 'react-bootstrap'

export default function ChatPage() {
  const [error, setError] = useState<string>('something went wrong')
  const [messages, setMessages] = useState<Message[]>([])

  //axios.defaults.baseURL = process.env.REACT_APP_CHAT_API || 'http://localhost:3001'
  axios.interceptors.request.use((config) => {
    if (!config?.headers) {
      config.headers = {}
    }
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      config.headers['authorization'] = `Bearer ${jwt}`
    }
    return config
  })

  const fetchMessages = async (): Promise<Message[]> => {
    const response = await axios.get<Message[]>('http://localhost:4000/api/messages')
    console.log(response.data)
    return response.data
  }

  useEffect(() => {
    fetchMessages()
      .then(setMessages)
      .catch((error) => {
        setMessages([])
        setError('Something went wrong when fetching messages...')
      })
  }, [])

  return (
    <Container className='chat-main g-0'>
      <Row>
        <Col md={4}>
          <header className='App-header'>chat app menu</header>
        </Col>
        <Col md={8}>
          <SimpleBar className='App-main'>
            {messages
              ? messages.map((message) => {
                  return <P key={message._id}>{message.text}</P>
                })
              : error}
          </SimpleBar>
          <footer className='App-footer'>
            {/* TODO render messages after sending a message */}
            <MessageInput />
          </footer>
        </Col>
      </Row>
    </Container>
  )
}
