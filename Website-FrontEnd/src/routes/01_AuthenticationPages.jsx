import React from 'react'
import { BrowserRouter as Routes, Route} from "react-router-dom";

import Login from '../pages/authentication/0_Login'
import Register from '../pages/authentication/0_Register'


function AuthenticationPages() {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AuthenticationPages