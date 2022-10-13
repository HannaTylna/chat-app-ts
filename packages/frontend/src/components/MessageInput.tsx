import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

export default function MessageInput() {
  const [text, setText] = useState<string>('')
  const sendMessage = () => {
    console.log('messagesend')
  }
  return (
    <InputGroup>
      <Form.Control
        placeholder='what are you thinking'
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant='danger' onClick={sendMessage}>
        send
      </Button>
    </InputGroup>
  )
}
