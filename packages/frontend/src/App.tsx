import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignUpPage from './pages/SignUpPage'
import { H1 } from './styles/StyledH1'

function App() {
  return (
    <div className='App'>
      <H1>KIKI EXPRESS CHAT APP 📨</H1>
      <Routes>
        <Route path='signup' element={<SignUpPage />} />
      </Routes>
    </div>
  )
}

export default App
