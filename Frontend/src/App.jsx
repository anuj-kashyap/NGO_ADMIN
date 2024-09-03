import { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './index.css'
import Login from './Component/Login'
import Dashboard from './Component/Dashboard'
import Donation from './Component/Donation';
import Profile from './Component/Profile';
import Volunteer from './Component/Volunteer';
import User from './Component/User';
import axios from 'axios';

function App() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [auth, setAuth] = useState(false);


  useEffect(()=>{
    axios.get(`${url}/api/user/loginchcek`,{withCredentials: true})
    .then(res=>{
      setAuth(res.data);
    }).catch(()=>{
      setAuth(false);
    })
  },[auth]);

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={auth ?<Navigate to ="/"/>:<Login/>} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/user" element={<User />} />
          
      </Routes>
     </Router>
    </>
  )
}

export default App
