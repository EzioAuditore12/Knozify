import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {View} from 'react-native'
//Stack Screen
import AuthenticationScreens from './01_AuthenticationScreens'
import BottomTabScreens from './02_BottomTabScreens'

//Authentication
import { loadAuth } from '../features/user'
import { useDispatch,useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native'


//Splash Screen
import BootSplash from "react-native-bootsplash";


const MainNavigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isAuthLoading } = useSelector(state => state.auth);

  useEffect(() => {
    const init = async () => {
      try {
        const result = await dispatch(loadAuth()).unwrap(); // If using createAsyncThunk
        // or
        // await dispatch(loadAuth()); // If using regular thunk
      } catch (error) {
        console.error('Auth loading failed:', error);
      }
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, [dispatch]);

  if (isAuthLoading) {
    return (
  <View className="flex-1 justify-center items-center bg-white">
  <View className="transform scale-150">
          <ActivityIndicator size="large" color="#28A361" />
     </View>
  </View>
    )

  }

  return (
   <NavigationContainer>
        {isAuthenticated ? <BottomTabScreens /> : <AuthenticationScreens />}
   </NavigationContainer>
  )
}

export default MainNavigation