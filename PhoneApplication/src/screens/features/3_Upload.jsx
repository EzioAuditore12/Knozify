import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';

//components
import UploadPost from '../../components/3_Upload/01_UploadPost';
import UploadReel from '../../components/3_Upload/02_UploadReel';
import UploadVideo from '../../components/3_Upload/03_UploadVideo';
import Livestream from '../../components/3_Upload/04_Livestream';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
      tabBarPosition='bottom'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          elevation: 0,       // Remove shadow on Android
          shadowOpacity: 0,    // Remove shadow on iOS
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent', // Remove indicator line
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: true,
        tabBarShowIcon: true,
      }}
      sceneContainerStyle={{ flex: 1 }} // Makes screen content fill available space
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
    <View style={{ flex: 1 }}>
      <MyTabs/>
    </View>
  )
}

export default Upload