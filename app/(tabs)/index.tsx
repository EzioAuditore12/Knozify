import { View} from 'react-native'
import React, { useState } from 'react'
import { Text,Input,ActivityIndicator,Button,Checkbox } from '@/components/ui'

const Index = () => {
  const [isChecked,setIsChecked]=useState(false)
  return (
    <View className='flex-1 gap-y-2 p-2 justify-center items-center'>
      <Text>These are the reusable ui components</Text>
      <Input
      placeholder='Hello'
      className='w-full'
      />
      <ActivityIndicator
      className='text-pink-500'
      size={"xxxl"}
      />
    <Button>
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