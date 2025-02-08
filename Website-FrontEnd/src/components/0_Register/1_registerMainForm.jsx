import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

function RegisterMainForm() {
    const navigate = useNavigate()

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .min(5, ({ min }) => `Email must be at least ${min} characters`)
            .required('Email Address is Required'),
        phone_number: yup
            .string()
            .min(10, ({ min }) => `Phone Number must be at least ${min} characters`)
            .required('Phone Number is Required'),
        user_name: yup
            .string()
            .min(5, ({ min }) => `User Name must be at least ${min} characters`)
            .required('User Name is Required'),
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .required('Password is required'),
    })

    const handleSubmit = async (values) => {
        try {
            console.log('Form values:', values)
            // Add your API call here
        } catch (error) {
            console.error('Registration error:', error)
        }
    }

    return (
        <div className='bg-slate-100 min-h-screen p-4 mx-auto'>
            <h1 className='text-xl text-center mt-5 font-bold text-gray-600'>Create your account</h1>
            <Formik
                validationSchema={validationSchema}
                initialValues={{ 
                    email: '',
                    phone_number: '',
                    user_name: '',
                    password: ''
                }}
                onSubmit={handleSubmit}
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
                    <form onSubmit={handleSubmit} 
                          className='bg-white rounded-3xl flex flex-col gap-y-3 w-full mt-4 mb-4 p-2 shadow-lg max-w-[600px] h-xr:gap-y-5 md:p-3 xl:w-[500px] xl:gap-y-6'>
                        <div className='space-y-4'>
                            <div>
                                <label className='text-lg font-semibold text-gray-700'>Email</label>
                                <input
                                    type="email"
                                    className='w-full px-4 py-2 mt-2 border-2 border-gray-700 rounded-lg font-semibold text-black'
                                    name="email"
                                    placeholder="Email Address"
                                    onChange={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                                {touched.email && errors.email && (
                                    <p className='text-red-500 font-semibold'>{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className='text-lg font-semibold text-gray-700'>Phone Number</label>
                                <input
                                    type="tel"
                                    className='w-full px-4 py-2 mt-2 border-2 border-gray-700 rounded-lg font-semibold text-black'
                                    name="phone_number"
                                    placeholder="Phone Number"
                                    onChange={handleChange('phone_number')}
                                    onBlur={handleBlur('phone_number')}
                                    value={values.phone_number}
                                />
                                {touched.phone_number && errors.phone_number && (
                                    <p className='text-red-500 font-semibold'>{errors.phone_number}</p>
                                )}
                            </div>

                            <div>
                                <label className='text-lg font-semibold text-gray-700'>Username</label>
                                <input
                                    type="text"
                                    className='w-full px-4 py-2 mt-2 border-2 border-gray-700 rounded-lg font-semibold text-black'
                                    name="user_name"
                                    placeholder="Username"
                                    onChange={handleChange('user_name')}
                                    onBlur={handleBlur('user_name')}
                                    value={values.user_name}
                                />
                                {touched.user_name && errors.user_name && (
                                    <p className='text-red-500 font-semibold'>{errors.user_name}</p>
                                )}
                            </div>

                            <div>
                                <label className='text-lg font-semibold text-gray-700'>Password</label>
                                <input
                                    type="password"
                                    className='w-full px-4 py-2 mt-2 border-2 border-gray-700 rounded-lg font-semibold text-black'
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                                {touched.password && errors.password && (
                                    <p className='text-red-500 font-semibold'>{errors.password}</p>
                                )}
                            </div>

                            <button
                                className='w-full bg-[#28A361] py-3 rounded-lg text-white font-semibold text-xl disabled:opacity-50'
                                onClick={handleSubmit}
                                disabled={!isValid}
                            >
                                Register
                            </button>

                            <div className='text-center mt-4'>
                                <span className='text-gray-700'>Already have an account? </span>
                                <button
                                    className='text-green-600 font-semibold'
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default RegisterMainForm