import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';

//components
import UploadPost from '../../components/3_Upload/01_UploadPost';
import UploadReel from '../../components/3_Upload/02_UploadReel';
import UploadVideo from '../../components/3_Upload/03_UploadVideo';
import Livestream from '../../components/3_Upload/04_Livestream';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Tab.Navigator 
      tabBarPosition='bottom'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
          elevation: 0,       // Remove shadow on Android
          shadowOpacity: 0,    // Remove shadow on iOS
          height: 50,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: keyboardStatus ? 'none' : 'flex', // Hide tab bar when keyboard is visible
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent', // Remove indicator line
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: true,
        tabBarShowIcon: true,
      }}
      sceneContainerStyle={{ 
        backgroundColor: 'white',
        paddingBottom: 50, // Add padding to prevent content from being hidden behind tabs
      }}
    >
      <Tab.Screen name="Post" component={UploadPost} />
      <Tab.Screen name="Reel" component={UploadReel} />
      <Tab.Screen name="Video" component={UploadVideo} />
      <Tab.Screen name="Livestream" component={Livestream} />
    </Tab.Navigator>
  );
}

const Upload = () => {
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <MyTabs/>
    </KeyboardAvoidingView>
  )
}

export default Upload