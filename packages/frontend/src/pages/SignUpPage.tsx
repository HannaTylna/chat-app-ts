import { useState } from 'react'
import ReactBubblyEffectButton from 'react-bubbly-effect-button'
import axios from 'axios'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import { StyledFormDiv } from '../styles/StyledFormDiv'

const SignUpPage = () => {
  const [name, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const performSignup = async (): Promise<void> => {
    console.log('sign up')
    if (!name || !password) {
      setMessage('name and password is required')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
    const signupResponse = await axios.post('http://localhost:4000/api/users', {
      name: name,
      password: password,
    })
    console.log(signupResponse)
    if (signupResponse && signupResponse.status === 200) {
      console.log('user created')
      setMessage('user created successfully')
      setTimeout(() => {
        setMessage('')
      }, 5000)
      setUsername('')
      setPassword('')
    }
  }
  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <StyledFormDiv>
              <label>Name</label>
              <input
                type='text'
                value={name}
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
                <ReactBubblyEffectButton text='SIGN UP' bgColor='#E23D28' onClick={performSignup} />
              </div>
            </StyledFormDiv>
            {message && <Alert variant='danger'>{message}</Alert>}
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default SignUpPage
