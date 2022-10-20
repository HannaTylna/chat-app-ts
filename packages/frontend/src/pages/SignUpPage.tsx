import { useState } from 'react'
import ReactBubblyEffectButton from 'react-bubbly-effect-button'
import axios from 'axios'
import { Container, Row, Col, Alert, Button } from 'react-bootstrap'
import { StyledFormDiv } from '../styles/StyledFormDiv'
import { useNavigate } from 'react-router-dom'
import { H1 } from '../styles/StyledH1'

axios.defaults.baseURL = process.env.REACT_APP_CHAT_API || 'http://localhost:4000'
const SignUpPage = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const performSignup = async (): Promise<void> => {
    if (!username || !password || !email) {
      setMessage('name, mail, password are required')
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
    const signupResponse = await axios.post(`${axios.defaults.baseURL}/api/users`, {
      username: username,
      email: email,
      password: password,
    })

    if (signupResponse.status === 201) {
      console.log('user created')
      setMessage('user created successfully')
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }
  return (
    <>
      <H1>KIKI EXPRESS CHAT APP 📨</H1>
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
              <input
                type='email'
                value={email}
                placeholder='Enter mail'
                onChange={(e) => setEmail(e.target.value)}
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
