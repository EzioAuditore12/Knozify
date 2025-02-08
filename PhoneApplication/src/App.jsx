import { View, Text } from 'react-native'
import React from 'react'
import "../global.css"

const App = () => {
  return (
    <View className='flex-1 justify-center items-center bg-red-500'>
      <Text className='text-3xl text-center'>App initialized with nativeWind</Text>
    </View>
  )
}

export default App
