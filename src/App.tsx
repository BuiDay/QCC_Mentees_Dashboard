import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'
import Project from './pages/Project'
import Profile from './pages/Profile'


function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/projects' element={<Project />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
