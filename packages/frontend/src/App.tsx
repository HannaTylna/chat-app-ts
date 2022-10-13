import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/chatroom' element={<ChatPage />} />
      </Routes>
    </div>
  )
}

export default App
