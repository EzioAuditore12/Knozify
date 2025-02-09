import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'

const VerificationMain = ({ onSubmitOTP }) => {
  const [otp, setOtp] = useState('')

  const handleOtpChange = (text) => {
    const trimmedText = text.trim()
    setOtp(trimmedText)
    if (trimmedText.length === 6) {
      console.log("OTP Entered:", trimmedText)
      onSubmitOTP && onSubmitOTP(trimmedText)
    }
  }

  return (
    <View className='flex-1 bg-slate-100 p-2'>
      <Image 
        source={require('../../assets/otpIcon.png')}
        className='w-[150px] h-[150px] mx-auto mt-4 mb-4'
      />
      <Text className='text-2xl text-center font-bold text-gray-700'>OTP Authentication</Text>
      <Text className='text-lg text-center font-semibold text-gray-600'>Enter the OTP sent to your phone in messages</Text>
      <TextInput
        style={{ 
          height: 40, 
          borderColor: 'gray', 
          borderWidth: 1, 
          marginTop: 20, 
          paddingHorizontal: 5, 
          textAlign: 'center' 
        }}
        placeholder="******"
        keyboardType="string"
        onChangeText={handleOtpChange}
        value={otp}
        maxLength={6}
      />
    </View>
  )
}

export default VerificationMain