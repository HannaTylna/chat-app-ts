import { useState } from 'react'
import ReactBubblyEffectButton from 'react-bubbly-effect-button'
import axios from 'axios'
import { Container, Row, Col, Alert, Button } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'
import { StyledFormDiv } from '../styles/StyledFormDiv'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [mailerror, setMailError] = useState<string | null>()

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email)
  }
  const handleMailChange = (event: any) => {
    if (!isValidEmail(event.target.value)) {
      setMailError('Email is invalid')
    } else {
      setMailError('')
    }
    setEmail(event.target.value)
  }

  const performSignup = async (): Promise<void> => {
    if (!username || !password || !email) {
      setMessage('name, mail, password are required')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
    const signupResponse = await axios.post(`${process.env.REACT_APP_CHAT_API}/api/users`, {
      username: username,
      email: email,
      password: password,
    })

    if (signupResponse.status === 201) {
      setMessage('user created successfully')
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }
  return (
    <>
      <h1>KIKI EXPRESS CHAT APP 📨</h1>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <StyledFormDiv>
              <h2>SIGN UP</h2>
              <label>Username</label>
              <input
                type='text'
                value={username}
                placeholder='Enter username'
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Mail</label>
              <span>{mailerror}</span>
              <input
                type='email'
                value={email}
                placeholder='Enter mail'
                onChange={handleMailChange}
              />

              <label>Password</label>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div>
                <ReactBubblyEffectButton text='SIGN UP' bgColor='#E23D28' onClick={performSignup} />
              </div>

              <p>
                already user?
                <Button variant='info' onClick={() => navigate('/login')}>
                  login
                </Button>
              </p>
            </StyledFormDiv>
          </Col>
          <Col md={2}>{message && <Alert variant='danger'>{message}</Alert>}</Col>
        </Row>
      </Container>
    </>
  )
}
export default SignUpPage
