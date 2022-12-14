import { useState } from 'react'
import ReactBubblyEffectButton from 'react-bubbly-effect-button'
import axios from 'axios'
import { Container, Row, Col, Alert, Button } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'
import { StyledFormDiv } from '../styles/StyledFormDiv'

function SignUpPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [mailerror, setMailError] = useState<string | null>()

  function isValidEmail() {
    return /\S+@\S+\.\S+/.test(email)
  }
  // eslint-disable-next-line
  const handleMailChange = (event: any) => {
    if (!isValidEmail()) {
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

    const signupResponse = await axios.post('/api/users', {
      username,
      email,
      password,
    })

    if (signupResponse.status === 201) {
      setMessage('user created successfully')
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }
  return (
    <div className='mt-5 mb-5'>
      <h1>KIKI EXPRESS CHAT APP 📨</h1>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <StyledFormDiv>
              <h2>SIGN UP</h2>
              <label htmlFor='username'>Username</label>
              <input
                id='username'
                type='text'
                value={username.toLowerCase()}
                placeholder='Enter username'
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor='email'>Email</label>
              <span>{mailerror}</span>
              <input
                id='email'
                type='email'
                value={email}
                placeholder='Enter mail'
                onChange={handleMailChange}
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
                <ReactBubblyEffectButton text='SIGN UP' bgColor='#E23D28' onClick={performSignup} />
              </div>

              <p>
                already user?
                <Button variant='info' onClick={() => navigate('/login')}>
                  LOGIN
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
export default SignUpPage
