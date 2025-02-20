import React from 'react'
import { View, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

function UserReels({userReels}) {
  return (
    <View className='flex-1 p-4'>
      <View className='flex-row items-center justify-between mb-4'>
        <Text className='text-lg font-semibold text-gray-600'>Your Reels</Text>
        <Icon name='video-library' size={24} color='#64748b' />
      </View>
      
      {userReels.length > 0 ? (
        <View className='flex-1'>
          <Text className='text-gray-500 mb-2'>Total Reels: {userReels.length}</Text>
          
        </View>
      ) : (
        <View className='flex-1 justify-center items-center'>
          <Icon name='video-collection' size={80} color='#9AE6C6' />
          <Text className='text-gray-500 mt-4 text-lg'>No reels yet</Text>
          <Text className='text-gray-400 text-center mt-2'>
            Create your first reel to share with your followers
          </Text>
        </View>
      )}
      
    </View>
  )
}

export default UserReels