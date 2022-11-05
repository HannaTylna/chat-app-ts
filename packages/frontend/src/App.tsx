import React from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import { Container } from 'react-bootstrap'
import LoginPage from './pages/LoginPage'

import SignUpPage from './pages/SignUpPage'
import ChatRoomPage from './pages/ChatRoomPage'

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
function App() {
  return (
    <div className='App'>
      <Container>
        <Routes>
          <Route path='/' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/chatroom' element={<ChatRoomPage />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
