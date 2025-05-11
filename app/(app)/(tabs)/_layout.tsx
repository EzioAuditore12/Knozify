import { Tabs } from 'expo-router';
import React from 'react';
import {AntDesign} from '@expo/vector-icons'
import MyTabBar from '@/components/bottom-tab-bar';

const Layout=()=> {
  return (
    <Tabs
    tabBar={(props)=><MyTabBar {...props}/>}>
     <Tabs.Screen
      name="index"
      options={{
      title: 'Home',
      tabBarIcon: ({ color }) => <AntDesign size={28} name="home" color={color} />,
      }}
      />
      <Tabs.Screen
      name="search"
      options={{
      title: 'Search',
      tabBarIcon: ({ color }) => <AntDesign size={28} name="search1" color={color} /> ,
      }}
      />
      <Tabs.Screen
      name="reels"
      options={{
      title: 'Reels',
      tabBarIcon: ({ color }) => <AntDesign size={28} name="videocamera" color={color} /> ,
      }}
      />
      <Tabs.Screen
      name="profile"
      options={{
      title: 'Profile',
      tabBarIcon: ({ color }) => <AntDesign size={28} name="user" color={color} /> ,
      }}
      />
    </Tabs>
  );
}

export default Layout
