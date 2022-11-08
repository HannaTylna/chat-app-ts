import { Message } from '@chat-app/shared'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { dateTimeFormat } from '../util/datetimeFormat'

type MessageProps = {
  messageItem: Message
}
export function MessageItem(props: MessageProps) {
  const [currentUser, setCurrentUser] = useState<string>('')
  // eslint-disable-next-line react/destructuring-assignment
  const { text, sender, createdAt } = props.messageItem
  const formattedDateTime = dateTimeFormat(createdAt)

  const getUser = async () => {
    const response = await axios.get('/api/users/userInfo')
    setCurrentUser(response.data.username)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <main>
      {sender.toLowerCase() !== currentUser ? (
        <Row className='m-3'>
          <Col className='bg-light rounded' md={{ span: 4 }}>
            <p className='fw-light bubble-left mt-1'>{sender}</p>
            <p className='fs-5' style={{ textAlign: 'right' }}>
              {text}
            </p>
            <small>{formattedDateTime}</small>
          </Col>
        </Row>
      ) : (
        <Row className='m-3'>
          <Col className='bg-info rounded' md={{ offset: 8 }}>
            <p className='fw-light bubble-right mt-1'>{sender}</p>
            <p className='fs-5' style={{ textAlign: 'left' }}>
              {text}
            </p>
            <small>{formattedDateTime}</small>
          </Col>
        </Row>
      )}
    </main>
  )
}
