import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'

function LoginMainForm() {
    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    const loginValidationSchema = yup.object().shape({
        username: yup.string().required('Username is Required'),
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
    })

    return (
        <View className="p-2 flex flex-col items-center justify-center">
            <Text className="font-bold text-gray-700 text-lg mt-4">Login to your account</Text>
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
                    <View className="bg-white rounded-3xl flex flex-col gap-y-3 w-full mt-4 mb-4 p-2 shadow-md">
                        <Text className="font-semibold">Username or Email</Text>
                        <TextInput
                            className="w-full p-2 border-2 border-black rounded-lg"
                            onChangeText={handleChange('username')}
                            value={values.username}
                            placeholder="Enter username or email"
                        />
                        {errors.username && 
                            <Text className="text-red-500 text-xs">{errors.username}</Text>
                        }

                        <Text className="font-semibold">Password</Text>
                        <TextInput
                            className="w-full p-2 border-2 border-black rounded-lg"
                            onChangeText={handleChange('password')}
                            value={values.password}
                            secureTextEntry
                            placeholder="Enter password"
                        />
                        {errors.password && 
                            <Text className="text-red-500 text-xs">{errors.password}</Text>
                        }

                        <View className="flex flex-row justify-between items-center">
                            <View className="flex flex-row items-center gap-x-2">
                                <Switch
                                    trackColor={{ false: "#767577", true: "#a7f3d0" }}
                                    thumbColor={isEnabled ? "#10b981" : "#f4f3f4"}
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                                <Text>Remember me</Text>
                            </View>
                            <Text className="text-green-500">Forgot Password?</Text>
                        </View>

                        <TouchableOpacity 
                            className="p-2 bg-green-500 active:bg-green-200 rounded-md"
                            onPress={handleSubmit}
                        >
                            <Text className="text-white text-center">Login</Text>
                        </TouchableOpacity>

                        <View className="flex flex-row justify-center gap-x-1">
                            <Text>Don't have an account?</Text>
                            <Text className="text-green-500">Register</Text>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default LoginMainForm