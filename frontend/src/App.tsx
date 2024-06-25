import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'
import Project from './pages/Project'
import Profile from './pages/Profile'
import Course from './pages/Course'
import Evaluation from './pages/Evaluation'
import Auth from './pages/Auth'

function App() {
  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route path='/dashboard' element={<Home />} />
          <Route path='/dashboard/projects' element={<Project />} />
          <Route path='/dashboard/profile' element={<Profile />} />
          <Route path='/dashboard/courses' element={<Course />} />
          <Route path='/dashboard/courses/:id' element={<Evaluation />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
