import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from '../pages/authentication/0_Login'
import Register from '../pages/authentication/0_Register'

const AuthenticationPages = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AuthenticationPages