import React from 'react'

//Components
import LoginBackground from '../components/0_loginBackground'
import LoginMainForm from '../components/1_loginMainForm'

const Login = () => {
  return (
    <div className='flex flex-col h-screen bg-slate-100 xl:flex-row'>
    <LoginBackground/>
    <LoginMainForm/>
    </div>
  )
}

export default Login