import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

//components
import RegisterBackground from '../../components/0_Register/0_registerBackground'
import RegisterMainForm from '../../components/0_Register/1_registerMainForm'

const Register = () => {
  return (
    <ScrollView>
      <RegisterBackground/>
      <RegisterMainForm/>
    </ScrollView>
  )
}

export default Register