import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    Outlet,
} from "react-router-dom";


//Pages
import Login from '../pages/authentication/0_Login';
import Register from '../pages/authentication/0_Register';
import Home from '../pages/features/1_Home';

function MainRouting() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </>
  )
}

export default MainRouting