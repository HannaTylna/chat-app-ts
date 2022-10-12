import { useState } from 'react'
import ReactBubblyEffectButton from 'react-bubbly-effect-button'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import { StyledFormDiv } from '../styles/StyledFormDiv'

const SignUpPage = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const performSignup = async (): Promise<void> => {
    console.log('sign up')
    const signupResponse = await axios.post('http://localhost:4000/api/users', {
      username: username,
      password: password,
    })
    if (signupResponse && signupResponse.status === 200) {
      console.log('user created')
      setSuccessMessage('user created successfully')
      setTimeout(() => {
        setSuccessMessage('')
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
                <ReactBubblyEffectButton text='SIGN UP' bgColor='#E23D28' onClick={performSignup} />
              </div>
            </StyledFormDiv>
          </Col>
        </Row>
      </Container>

      {successMessage && <p>{successMessage}</p>}
    </>
  )
}
export default SignUpPage
