import React from 'react'
import { Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

//Components
import LoginBackground from '../../components/0_Login/0_loginBackground'
import LoginMainForm from '../../components/0_Login/1_loginMainForm'


//Authentication
import { useDispatch,useSelector } from 'react-redux'
import { loginUser } from '../../features/user'
import { Alert } from 'react-native'

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthLoading, error } = useSelector((state) => state.auth);

  // changed handleLogin to pass an object
  const handleLogin = async (user_name, password) => {
    try {
      await dispatch(loginUser({ username: user_name, password })).unwrap();
    } catch(err) {
      console.log(err);
      Alert.alert('Error', 'Invalid Credentials');
    }    
  }

  return (
    <ScrollView className='flex-1 '>
        <LoginBackground/>
        <LoginMainForm onSubmit={handleLogin}/>
        {error && <Text className="text-red-500 text-center p-2">{error}</Text>}
    </ScrollView>
  )
}

export default Login