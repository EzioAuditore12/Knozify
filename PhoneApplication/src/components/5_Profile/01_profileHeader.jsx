import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

const UserLogoutOptions = ({userName}) => {
    return(
        <View className='flex-row items-center gap-x-1'>
            <Text className='text-lg font-bold text-gray-900'>{userName}</Text>
            <Icon name='down' size={10} color='black'  />
        </View>
    )
}

const ToggleButton = () => {
    return(
        <View className='bg-gray-200 p-2 rounded-full '>
            <Icon name='menuunfold' size={24} color='black' />
        </View>
    )
}   

const EditButton=()=>{
    return(
        <View className='bg-gray-200 p-2 rounded-2xl flex-row gap-x-2 items-center '> 
            <Text className='font-semibold text-lg'>Edit</Text>
        </View>
    )
}

const ProfileHeader = ({userDetails}) => {
  return (
    <View className='flex-row items-center w-full p-2 justify-between '>
      <UserLogoutOptions userName={userDetails.userName}/>
        
        <View className='flex-row gap-x-2'>
        <EditButton/>
        <ToggleButton/>
        </View>
    </View>
  )
}

export default ProfileHeader