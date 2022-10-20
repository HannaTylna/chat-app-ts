import { useState } from 'react'
import ReactBubblyEffectButton from 'react-bubbly-effect-button'
import axios from 'axios'
import { Container, Row, Col, Alert, Button } from 'react-bootstrap'
import { StyledFormDiv } from '../styles/StyledFormDiv'
import { useNavigate } from 'react-router-dom'
import { H1 } from '../styles/StyledH1'

axios.defaults.baseURL = process.env.REACT_APP_CHAT_API || 'http://localhost:4000'
axios.interceptors.request.use((config) => {
  if (!config?.headers) {
    config.headers = {}
  }
  const jwt = localStorage.getItem('chatapp')
  if (jwt) {
    config.headers['authorization'] = `Bearer ${jwt}`
  }
  return config
})

const LoginPage = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [inlogged, setInlogged] = useState<boolean>(false)

  const performLogin = async (): Promise<void> => {
    console.log('sign up')
    if (!username || !password) {
      setMessage('name, password are required')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
    const loginResponse = await axios.post(`${axios.defaults.baseURL}/api/users/login`, {
      username: username,
      password: password,
    })
    console.log(loginResponse)
    if (loginResponse && loginResponse.status === 200) {
      localStorage.setItem('chatapp', loginResponse.data.token)

      setInlogged(true)
      navigate('/chatroom')
    }
  }
  return (
    <>
      <H1>KIKI EXPRESS CHAT APP 📨</H1>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <StyledFormDiv>
              <h2>LOG IN</h2>
              <label>Username</label>
              <input
                type='text'
                value={username}
                placeholder='Enter username'
                onChange={(e) => setUsername(e.target.value)}
              />

              <label>Password</label>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div>
                <ReactBubblyEffectButton text='LOG IN' bgColor='#E23D28' onClick={performLogin} />
              </div>

              <p>
                not signup yet?
                <Button variant='info' onClick={() => navigate('/signup')}>
                  signup
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
export default LoginPage
