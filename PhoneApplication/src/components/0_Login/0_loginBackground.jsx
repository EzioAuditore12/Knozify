import React from 'react';
import { View, Image, useWindowDimensions } from 'react-native';

function LoginBackground() {
  const { width } = useWindowDimensions();
  const isXlScreen = width >= 1280;

  return (
    <View className={`h-[250px] h-xr:h-[500px] md:h-[350px] overflow-hidden rounded-b-3xl relative ${
      isXlScreen ? 'xl:h-screen xl:rounded-none xl:w-[50%]' : ''
    }`}>
      <Image 
        source={require('../../assets/loginBackground.jpg')}
        className={`${isXlScreen ? 'h-screen' : 'absolute'} top-0 left-0 w-full h-full`}
        resizeMode="cover"
      />
    </View>
  );
}

export default LoginBackground;