import React, { useState } from 'react'
import ReactBubblyEffectButton from 'react-bubbly-effect-button'
import axios from 'axios'
import { Container, Row, Col, Alert, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { StyledFormDiv } from '../styles/StyledFormDiv'

function LoginPage() {
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const performLogin = async (): Promise<void> => {
    if (!username || !password) {
      setMessage('name, password are required')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
    const loginResponse = await axios.post('/api/users/login', {
      username,
      password,
    })
    if (loginResponse && loginResponse.status === 200) {
      localStorage.setItem('chatapp', loginResponse.data.token)

      navigate('/chatroom')
    }
  }
  return (
    <div className='mt-5 mb-5'>
      <h1>KIKI EXPRESS CHAT APP 📨</h1>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <StyledFormDiv>
              <h2>LOG IN</h2>
              <label htmlFor='username'>Username</label>

              <input
                id='username'
                type='text'
                value={username.toLowerCase()}
                placeholder='Enter username'
                onChange={(e) => setUsername(e.target.value)}
              />

              <label htmlFor='password'>Password</label>
              <input
                id='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div>
                <ReactBubblyEffectButton text='LOGIN' bgColor='#4a3492' onClick={performLogin} />
              </div>

              <p>
                not signup yet?
                <Button variant='info' onClick={() => navigate('/')}>
                  SING UP
                </Button>
              </p>
            </StyledFormDiv>
          </Col>
          <Col md={2}>{message && <Alert variant='danger'>{message}</Alert>}</Col>
        </Row>
      </Container>
    </div>
  )
}
export default LoginPage
