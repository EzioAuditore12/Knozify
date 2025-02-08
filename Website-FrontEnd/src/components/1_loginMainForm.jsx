import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Switch from 'react-switch'

function LoginMainForm() {
    const [rememberMe, setRememberMe] = useState(true)

    const loginValidationSchema = yup.object().shape({
        usernameORemail: yup.string().required('Username or email is required'),
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
    })

    const handleLogin = async (values) => {
        try {
            console.log('Form values:', values)
            console.log('Remember me:', rememberMe)
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    return (
        <div className='p-2 flex flex-col items-center justify-center xl:mx-auto'>
            <h1 className='font-bold text-gray-700 text-lg mt-4 md:text-2xl xl:mb-[100px]'>Login to your account</h1>
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ usernameORemail: '', password: '' }}
                onSubmit={handleLogin}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid,
                }) => (
                    <form onSubmit={handleSubmit} className='bg-white rounded-3xl flex flex-col gap-y-3 w-full mt-4 mb-4 p-2 shadow-lg max-w-[600px] h-xr:gap-y-5 md:p-3 xl:w-[500px] xl:gap-y-6'>
                        <h2 className='font-semibold md:text-lg'>Username or Email</h2>
                        <input
                            type='text'
                            className='w-full p-2 border-2 border-black rounded-lg'
                            onChange={handleChange('usernameORemail')}
                            onBlur={handleBlur('usernameORemail')}
                            value={values.usernameORemail}
                        />
                        {touched.usernameORemail && errors.usernameORemail && (
                            <span className='text-red-500 text-sm'>{errors.usernameORemail}</span>
                        )}
                        
                        <h2 className='font-semibold md:text-lg'>Password</h2>
                        <input
                            type='password'
                            className='w-full p-2 border-2 border-black rounded-lg'
                            onChange={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        {touched.password && errors.password && (
                            <span className='text-red-500 text-sm'>{errors.password}</span>
                        )}

                        <div className='flex flex-row justify-between items-center'>
                            <div className='flex flex-row items-center gap-x-2'>
                                <Switch
                                    checked={rememberMe}
                                    onChange={setRememberMe}
                                    onColor="#10B981"
                                    offColor="#D1D5DB"
                                />
                                <label>Remember me</label>
                            </div>    
                            <a href='/forgot-password' className='text-green-500 hover:text-green-600'>
                                Forgot Password?
                            </a>
                        </div>

                        <button 
                            className='p-2 bg-green-500 hover:bg-green-600 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed'
                            type='submit'
                            disabled={!isValid}
                        >
                            Login
                        </button>

                        <h3 className='text-center'>
                            Don't have an account? {' '}
                            <a href='/register' className='text-green-500 hover:text-green-600'>
                                Register
                            </a>
                        </h3>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default LoginMainForm