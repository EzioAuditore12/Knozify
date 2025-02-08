import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Switch from 'react-switch'

function LoginMainForm() {
    const loginValidationSchema = yup.object().shape({
        username: yup
        .string()
        .required('Username is Required'),
        password: yup
          .string()
          .min(8, ({ min }) => `Password must be at least ${min} characters`)
          .required('Password is required'),
      })

  return (
    <div className='p-2 flex flex-col items-center justify-center xl:mx-auto'>
    <h1 className='font-bold text-gray-700 text-lg mt-4 md:text-2xl xl:mb-[100px]'>Login to your account</h1>
    <Formik
    validationSchema={loginValidationSchema}
    initialValues={{ username: '', password: '' }}
    onSubmit={(values) => {
      console.log(values)
    }}
    >
    {({
      handleSubmit,
      handleChange,
      values,
      errors,
    }) => (
        <div className='bg-white rounded-3xl flex flex-col gap-y-3 w-full mt-4 mb-4 p-2 shadow-lg max-w-[600px] h-xr:gap-y-5 md:p-3 xl:w-[500px] xl:gap-y-6 '>
            <h2 className='font-semibold md:text-lg'>Username or Email</h2>
            <input
                type='text'
                className='w-full p-2 border-2 border-black rounded-lg'
            />
            <h2 className='font-semibold md:text-lg'>Password</h2>
            <input
                type='password'
                className='w-full p-2 border-2 border-black rounded-lg'
            />
            <div className='flex flex-row justify-between items-center'>
                
                <div className='flex flex-row items-center gap-x-2'>
                <Switch/>
                <label>Remember me</label>
                </div>    

                <h3 className='text-green-500'>Forgot Password?</h3>
            </div>
            <button 
            className='p-2 bg-green-500 hover:bg-green-200 rounded-md'
            type='submit'
            >Login</button>
            <h3 className='text-center'>Don't have an account? <a href='/register' className='text-green-500'>Register</a></h3>
        </div>
    )}
    </Formik>
    </div>
  )
}

export default LoginMainForm