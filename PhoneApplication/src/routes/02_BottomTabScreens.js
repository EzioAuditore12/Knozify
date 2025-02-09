import { View, Text } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons';

//Screens

import Home from '../screens/features/1_Home'
import Search from '../screens/features/2_Search';
import Upload from '../screens/features/3_Upload';
import Reel from '../screens/features/4_Reel';
import UserProfile from '../screens/features/5_UserProfile';

const Tabs = createBottomTabNavigator();




const BottomTabScreens = () => {
  return (
    <Tabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 55,
            backgroundColor: 'white',
          },
          elevation:10
        }}
      >
        <Tabs.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home-filled" color={color} size={30} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="search" color={color} size={30} />
            ),
          }}
        />
           <Tabs.Screen
          name="FloatingButton"
          component={Upload}
          options={{
            tabBarIcon: () => (
              <Icon name="add-circle" color='#00c9a7' size={30} />
            ),
          }}
        />
        <Tabs.Screen
          name="Reel"
          component={Reel}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="movie" color={color} size={30} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="AddFriends"
          component={UserProfile}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="person-add" color={color} size={30} />
            ),
          }}
        />
      </Tabs.Navigator>
  )
}

export default BottomTabScreens