import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'

import SignUpPage from './pages/SignUpPage'
import ChatRoomPage from './pages/ChatRoomPage'

function App() {
  return (
    <div className='App'>
      <h1>frontend</h1>

      <Routes>
        <Route path='/' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/chatroom' element={<ChatRoomPage />} />
      </Routes>
    </div>
  )
}

export default App
