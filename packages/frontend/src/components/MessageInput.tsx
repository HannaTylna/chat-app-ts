import { Message } from '@chat-app/shared'
import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

export default function MessageInput() {
  const [text, setText] = useState<string>('')
  const [error, setError] = useState<string>('')

  const sendMessage = async (text: string) => {
    console.log('send message')
    const message: Message = {
      text: text,
      timeStamp: new Date(),
      sender: '123',
    }
    console.log('message', message)
    try {
      const newMessage = await axios.post('http://localhost:4000/api/messages/send', message)
      console.log(newMessage)
    } catch (err) {
      setError('something went wrong when sending message')
    }
  }
  return (
    <InputGroup>
      {error && error}
      <Form.Control
        placeholder='what are you thinking'
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant='danger' onClick={(e) => sendMessage(text)}>
        send
      </Button>
    </InputGroup>
  )
}
