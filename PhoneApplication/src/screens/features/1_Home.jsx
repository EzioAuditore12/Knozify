import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';



//Logout functionality
import { logout } from '../../features/user/user.auth';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const { user, isAuthLoading } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    // Navigation will be handled by MainNavigation since we're changing auth state
  };

  if (isAuthLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#28A361" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">User Profile</Text>
        <TouchableOpacity 
          className="bg-red-500 px-4 py-2 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-white font-bold">Logout</Text>
        </TouchableOpacity>
      </View>

      {user ? (
        Object.entries(user).map(([key, value]) => (
          <View key={key} className="bg-gray-100 p-4 rounded-lg mb-2">
            <Text className="font-bold">{key}:</Text>
            <Text>{typeof value === 'object' ? JSON.stringify(value, null, 2) : value}</Text>
          </View>
        ))
      ) : (
        <Text>No user data available</Text>
      )}
    </ScrollView>
  );
};

export default Home;