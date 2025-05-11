import { View} from 'react-native'
import React, { useState } from 'react'
import { Text,Input,ActivityIndicator,Button,Checkbox } from '@/components/ui'
import { authStore } from '@/store'
import { axiosInstance } from '@/services/axiosInstance'

const Index = () => {
  const [isChecked,setIsChecked]=useState(false)
  const {user,authTokens}=authStore.getState()

  const getUserDetails=async()=>{
    const response=await axiosInstance.get("/account/api/v1/get-user/")
    console.log(response.data)
  }
  return (
    <View className='flex-1 gap-y-2 p-2 justify-center items-center'>
      <Text>These are the reusable ui components</Text>
      <Input
      placeholder='Hello'
      className='w-full'
      />
      <Text>
        {user?.user_id}
      </Text>
      <Text>
        {authTokens?.access}
      </Text>
      <Text>
        {authTokens?.refresh}
      </Text>
      <ActivityIndicator
      className='text-pink-500'
      size={"xxxl"}
      />
    <Button
    onPress={()=>{
      getUserDetails()
    }}
    >
      <Text
      className='text-white'
      >Hello</Text>
    </Button>
    <Checkbox
    value={isChecked}
    onValueChange={(value)=>setIsChecked(value)}
    className='text-red-500'
    size={"xl"}
    />
    </View>
  )
}

export default Index