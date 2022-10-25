import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'

import SignUpPage from './pages/SignUpPage'
import ChatRoomPage from './pages/ChatRoomPage'
import { Container } from 'react-bootstrap'

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
