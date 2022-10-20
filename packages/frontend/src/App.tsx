import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </div>
  )
}

export default App
