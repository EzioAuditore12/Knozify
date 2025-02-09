import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

//Components
import LoginBackground from '../../components/0_Login/0_loginBackground'
import LoginMainForm from '../../components/0_Login/1_loginMainForm'


//Authentication
import { useDispatch,useSelector } from 'react-redux'
import { loginUser } from '../../features/user'




const Login = () => {
  
  return (
    <ScrollView className='flex-1 '>
        <LoginBackground/>
        <LoginMainForm/>
    </ScrollView>
  )
}

export default Login