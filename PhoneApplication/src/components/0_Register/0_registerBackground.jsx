import { View, ImageBackground} from 'react-native'
import React from 'react'


const RegisterBackground = () => {
  return (
    <View className='max-h-[200px] w-full rounded-b-3xl overflow-hidden'>
    <ImageBackground source=
    {require('../../assets/loginBackground.jpg')}
    className='object-center h-full w-full'
    />

    </View>
  )
}

export default RegisterBackground