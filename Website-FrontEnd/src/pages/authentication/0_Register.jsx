import React from 'react'
import RegisterBackground from '../../components/0_Register/0_registerBackground'
import RegisterMainForm from '../../components/0_Register/1_registerMainForm'

const Register = () => {
  return (
    <div className='flex flex-col h-full bg-slate-100 xl:flex-row'>
      <RegisterBackground/>
      <RegisterMainForm/>
    </div>
  )
}

export default Register