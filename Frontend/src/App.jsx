import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './index.css'
import Login from './Component/Login'
import Dashboard from './Component/Dashboard'
import Donation from './Component/Donation';
import Profile from './Component/Profile';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Navigate to ="/login"/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/profile" element={<Profile />} />
          
      </Routes>
     </Router>
    </>
  )
}

export default App
