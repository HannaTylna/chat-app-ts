import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <div className='App'>
      <h1>frontend</h1>
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </div>
  )
}

export default App
