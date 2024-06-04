import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'

function App() {

  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
