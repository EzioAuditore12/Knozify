import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import Login from '../screens/authentication/0_Login'
import Register from '../screens/authentication/0_Register'


const stack = createStackNavigator()


const AuthenticationScreens = () => {
  return (
    <stack.Navigator>
        <stack.Screen 
        name="Login" 
        component={Login}
        options={{
            headerShown: false
        }}
         />
        <stack.Screen 
        name="Register" 
        component={Register}
        options={{
            headerShown: false
        }}
         />
    </stack.Navigator>
  )
}

export default AuthenticationScreens