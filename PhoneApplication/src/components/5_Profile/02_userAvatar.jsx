import { View, Text, Image } from 'react-native'
import React from 'react'

const UserAvatar = ({UserAvatar}) => {
  return (
    <View className='mt-[10px]'>
    <View 
    className='p-2 bg-gray-100 rounded-full h-[120px] w-[120px] relative'
    elevation={5}
    >
      <Image 
        source={{ 
          uri: 'https://res.cloudinary.com/dpcloud123/image/upload/v1737164154/avmrjdkmjr116rxu5uis.jpg'
        }}
        className='absolute rounded-full h-[120px] w-[120px]'
      />
    </View>
    <Text className='text-2xl font-bold mt-4 text-gray-600 text-center'>Daksh Purohit</Text>
    <Text className='text-lg font-semibold mt-1 text-gray-500 text-center'>@dakshpurohit</Text>
    </View>
  )
}

export default UserAvatar  // Added export