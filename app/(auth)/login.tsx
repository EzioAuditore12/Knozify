import { ScrollView } from 'react-native'
import { Dimensions } from 'react-native'
import { router } from 'expo-router'
import { useState } from 'react'

//components
import LoginHeader from '@/modules/auth/login/components/loginHeader'
import LoginForm from '@/modules/auth/login/components/loginForm'

//hooks
import { LoginUser } from '@/modules/auth/login/hooks/loginUser'


const Login = () => {
  //get the device height
  const { height} = Dimensions.get('screen')
  const [error, setError] = useState<string>('')

 const handleSubmit = async ({ username, password }: { username: string, password: string }) => {
    
    const result = await LoginUser(username, password)
    if (result.success) {
      router.replace("/(app)/(tabs)")
    } else {
      setError(result.message || '')
    }
  }
  
  return (
    <ScrollView
    className='flex-1'
    contentContainerClassName='flex-1 bg-red-500'
    contentContainerStyle={{minHeight:height}}
    >
      <LoginHeader
      className='bg-red-500'
      style={{
        flex:height >700 ? 0.45 : 0.4
      }}
      />
      <LoginForm
      onSubmit={handleSubmit}
      error={error}
      />
    </ScrollView>
  )
}

export default Login