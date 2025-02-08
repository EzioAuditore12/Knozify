import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

//Stack Screen
import StackScreens from './01_StackScreens'

const MainNavigation = () => {
  return (
   <NavigationContainer>
        <StackScreens />
   </NavigationContainer>
  )
}

export default MainNavigation