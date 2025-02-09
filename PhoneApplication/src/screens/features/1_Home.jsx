import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user, isAuthLoading } = useSelector(state => state.auth);

  if (isAuthLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#28A361" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4">
      <View>
        <Text className="text-xl font-bold mb-4">
          User Profile
        </Text>
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
      </View>
    </ScrollView>
  );
};

export default Home;