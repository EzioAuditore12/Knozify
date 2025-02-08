import React from 'react'

//Components
import LoginBackground from '../components/0_Login/0_loginBackground'
import LoginMainForm from '../components/0_Login/0_loginMainForm'
import { ScrollView } from 'react-native-gesture-handler'

const Login = () => {
  return (
    <ScrollView className='flex-1 '>
        <LoginBackground/>
        <LoginMainForm/>
    </ScrollView>
  )
}

export default Login