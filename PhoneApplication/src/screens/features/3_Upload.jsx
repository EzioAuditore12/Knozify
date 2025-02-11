import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


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
    tabBarOptions={{
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      labelStyle: { fontSize: 12, fontWeight: 'bold' },
      style: { backgroundColor: 'white' },
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
    <MyTabs/>
  )
}

export default Upload