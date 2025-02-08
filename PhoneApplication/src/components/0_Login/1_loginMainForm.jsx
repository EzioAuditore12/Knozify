import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native'

function LoginMainForm() {
    const [isEnabled, setIsEnabled] = useState(true)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    const Navigation=useNavigation()

    const loginValidationSchema = yup.object().shape({
        //username validation 
        usernameORemail: yup.string().required('Username is Required'),
        //password validation
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
    })

    return (
        <View className="p-2 flex flex-col items-center justify-center">
            <Text className="font-bold text-gray-700 text-xl mt-4">Login to your account</Text>
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ usernameORemail: '', password: '' }}
                onSubmit={(values) => {
                    console.log(values)
                    console.log(toggleSwitch, isEnabled)
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                }) => (
                    <View className="bg-white rounded-3xl flex flex-col gap-y-3 w-full mt-4 mb-4 p-2 elevation-5 shadow-2xl">

                        {/* Username or Email */}
                        <Text className="font-semibold text-lg text-gray-700">Username or Email</Text>
                        <TextInput
                            className="w-full p-2 border-2 border-black rounded-lg text-black"
                            name="usernameORemail" 
                            placeholder="Enter username or email"
                            placeholderTextColor={'#000'}
                            onChangeText={handleChange('usernameORemail')}
                            onBlur={handleBlur('usernameORemail')}
                            value={values.usernameORemail}
                            multiline={false}
                        />
                        {errors.usernameORemail && 
                            <Text className="text-red-500 text-xs">{errors.usernameORemail}</Text>
                        }

                        {/* Password */}
                        <Text className="font-semibold">Password</Text>
                        <TextInput
                            className="w-full p-2 border-2 border-black rounded-lg text-black"
                            name="password" 
                            placeholder="Password"
                            placeholderTextColor={'#000'}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                            multiline={false}
                        />
                        {errors.password && 
                            <Text className="text-red-500 text-xs">{errors.password}</Text>
                        }
                        
                        {/* Remember me */}
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
                        
                        {/* Login Button */}
                        <TouchableOpacity 
                            className="p-2 bg-green-500 active:bg-green-200 rounded-md"
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text className="text-white text-center">Login</Text>
                        </TouchableOpacity>

                        {/* Register Screen Navigate*/}
                        <View className="flex flex-row justify-center gap-x-1">
                            <Text>Don't have an account?</Text>
                            <Text 
                            className="text-green-500"
                            onPress={() => Navigation.navigate('Register')}
                            >Register</Text>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default LoginMainForm