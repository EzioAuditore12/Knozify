import React, { useState, useEffect } from 'react'
import { View, Image, Text } from 'react-native'
import { OtpInput } from "react-native-otp-entry"

const VerificationOTP = ({onSubmitOTP}) => {
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (otp.length === 6) {
      console.log(otp);
      onSubmitOTP(otp);
    }   
  }, [otp]);

  return (
    <View className='flex-1 p-3 justify-center items-center gap-y-5'>
      <Image 
        source={require('../../assets/otpIcon.png')}
        className="w-[200px] h-[200px]"
      />
      <Text className="font-semibol text-2xl">Enter OTP</Text>
      <OtpInput
        numberOfDigits={6}
        focusColor="green"
        autoFocus={true}
        hideStick={true}
        placeholder="******"
        textInputProps={{
          accessibilityLabel: "One-Time Password",
          keyboardType: 'numeric'
        }}
        onTextChange={(code) => setOtp(code)}
      />
    </View>
  )
}

export default VerificationOTP