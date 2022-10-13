import React, { useState, useEffect } from 'react'
import { Message, User } from '@chat-app/shared'
import axios from 'axios'
import MessageInput from '../components/MessageInput'
import { P } from '../styles/StyledParagraph'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { Col, Container, Row } from 'react-bootstrap'

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string>('')

  //axios.defaults.baseURL = process.env.REACT_APP_CHAT_API || 'http://localhost:3001'

  // const fetchMessages = async (): Promise<Message[]> => {
  //   const response = await axios.get<Message[]>('http://localhost:4000/messages')
  //   console.log(response.data)
  //   return response.data
  // }

  const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>('http://localhost:4000/api/users')
    console.log(response.data)
    return response.data
  }
  useEffect(() => {
    // fetchMessages()
    //   .then(setMessages)
    //   .catch((error) => {
    //     setMessages([])
    //     setError('Something went wrong when fetching messages...')
    //   })
    fetchUsers()
      .then(setUsers)
      .catch((err) => {
        setUsers([])
      })
  }, [])

  return (
    <Container className='chat-main g-0'>
      <Row>
        <Col md={4}>
          <header className='App-header'>chat app menu</header>
          {users &&
            users.map((user) => {
              return <p>{user.username}</p>
            })}
        </Col>
        <Col md={8}>
          <SimpleBar className='App-main'>
            {error
              ? error
              : messages.map((message) => {
                  return <P key={message._id}>{message.text}</P>
                })}
          </SimpleBar>
          <footer className='App-footer'>
            <MessageInput />
          </footer>
        </Col>
      </Row>
    </Container>
  )
}
