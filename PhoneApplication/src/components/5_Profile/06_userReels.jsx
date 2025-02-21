import React,{useState} from 'react'
import { View, Text, Image,FlatList,StyleSheet,TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FastImage from "react-native-fast-image";

const reelsData = [
  { id: "1", video: "https://django-react-test-bucket.s3.amazonaws.com/videos/3de89727-d0a3-4f94-8b1e-0d581e896abc/bleach.mp4", thumbnail: "https://user-images.githubusercontent.com/6876788/96633009-d1818000-1318-11eb-9f1d-7f914f4ccb16.gif" },
  { id: "2", video: "https://django-react-test-bucket.s3.amazonaws.com/videos/1f4dd05c-fc03-4114-8ac6-88f9a1352e58/Subaru", thumbnail: "https://user-images.githubusercontent.com/6876788/96633009-d1818000-1318-11eb-9f1d-7f914f4ccb16.gif" },
  { id: "3", video: "https://django-react-test-bucket.s3.amazonaws.com/videos/8e120d97-267a-4442-b9a5-685a2cb03385/VID-20240826-WA0016.mp4", thumbnail: "https://user-images.githubusercontent.com/6876788/96633009-d1818000-1318-11eb-9f1d-7f914f4ccb16.gif" },
  { id: "4", video: "https://django-react-test-bucket.s3.amazonaws.com/videos/4157ce0d-e77b-4325-a2be-45449d791553/VID-20250101-WA0012.mp4", thumbnail: "https://user-images.githubusercontent.com/6876788/96633009-d1818000-1318-11eb-9f1d-7f914f4ccb16.gif" },
  { id: "5", video: "https://django-react-test-bucket.s3.amazonaws.com/videos/3de89727-d0a3-4f94-8b1e-0d581e896abc/bleach.mp4", thumbnail: "https://user-images.githubusercontent.com/6876788/96633009-d1818000-1318-11eb-9f1d-7f914f4ccb16.gif" },
  { id: "6", video: "https://django-react-test-bucket.s3.amazonaws.com/videos/1f4dd05c-fc03-4114-8ac6-88f9a1352e58/Subaru", thumbnail: "https://user-images.githubusercontent.com/6876788/96633009-d1818000-1318-11eb-9f1d-7f914f4ccb16.gif" },
  { id: "7", video: "https://django-react-test-bucket.s3.amazonaws.com/videos/8e120d97-267a-4442-b9a5-685a2cb03385/VID-20240826-WA0016.mp4", thumbnail: "https://user-images.githubusercontent.com/6876788/96633009-d1818000-1318-11eb-9f1d-7f914f4ccb16.gif" },
  { id: "8", video: "https://django-react-test-bucket.s3.amazonaws.com/videos/4157ce0d-e77b-4325-a2be-45449d791553/VID-20250101-WA0012.mp4", thumbnail: "https://user-images.githubusercontent.com/6876788/96633009-d1818000-1318-11eb-9f1d-7f914f4ccb16.gif" },
  { id: "9", video: "https://django-react-test-bucket.s3.amazonaws.com/videos/3de89727-d0a3-4f94-8b1e-0d581e896abc/bleach.mp4", thumbnail: "https://user-images.githubusercontent.com/6876788/96633009-d1818000-1318-11eb-9f1d-7f914f4ccb16.gif" },
];


const ReelItem = ({ item }) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.item}>
          <FastImage
            source={{ uri: item.thumbnail }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
      </View>
    </TouchableWithoutFeedback>
  );
};

function UserReels({userReels}) {
  return (
    <View className='flex-1 p-4'>
      <View className='flex-row items-center justify-between mb-4'>
        <Text className='text-lg font-semibold text-gray-600'>Your Reels</Text>
        <Icon name='video-library' size={24} color='#64748b' />
      </View>
      
      {userReels.length > 0 ? (
        <View className='flex-1'>
          <Text className='text-gray-500 mb-2'>Total Reels: {userReels.length}</Text>
          <FlatList
        data={reelsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReelItem item={item} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
        </View>
      ) : (
        <View className='flex-1 justify-center items-center'>
          <Icon name='video-collection' size={80} color='#9AE6C6' />
          <Text className='text-gray-500 mt-4 text-lg'>No reels yet</Text>
          <Text className='text-gray-400 text-center mt-2'>
            Create your first reel to share with your followers
          </Text>
        </View>
      )}
      
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    aspectRatio: 1,
    margin: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});


export default UserReels