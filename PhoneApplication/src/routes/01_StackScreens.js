import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import Login from '../screens/0_Login'
import Register from '../screens/0_Register'


const stack = createStackNavigator()


const StackScreens = () => {
  return (
    <stack.Navigator>
        <stack.Screen 
        name="Login" 
        component={Login}
        options={{
            headerShown: false
        }}
         />
        <stack.Screen name="Register" component={Register} />
    </stack.Navigator>
  )
}

export default StackScreens