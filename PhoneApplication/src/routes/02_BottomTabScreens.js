import { Image, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import Home from '../screens/features/1_Home';
import Search from '../screens/features/2_Search';
import Upload from '../screens/features/3_Upload';
import Reel from '../screens/features/4_Reel';
import UserProfile from '../screens/features/5_UserProfile';

//User
import { useSelector, useDispatch } from 'react-redux';

const Tabs = createBottomTabNavigator();

const BottomTabScreens = () => {
 const {user} = useSelector(state => state.auth);
 const userImage = user?.profile_picture;
 const [keyboardStatus, setKeyboardStatus] = React.useState(false);

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
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 55,
          backgroundColor: 'white',
          display: keyboardStatus ? 'none' : 'flex'
        },
        elevation: 10,
        keyboardHidesTabBar: true, // Add this line
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home-filled" color={color} size={30} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => <Icon name="search" color={color} size={30} />,
        }}
      />
      <Tabs.Screen
        name="FloatingButton"
        component={Upload}
        options={{
          tabBarIcon: () => <Icon name="add-circle" color="#00c9a7" size={30} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="Reel"
        component={Reel}
        options={{
          tabBarIcon: ({ color }) => <Icon name="movie" color={color} size={30} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color, size }) =>
            userImage ? (
              <Image
                source={{ uri: userImage }}
                className='w-[30px] h-[30px] rounded-full'
              />
            ) : (
              <Icon name="person" color={color} size={30} />
            ),
            headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabScreens;
