import React, { useRef, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import ImageViewing from 'react-native-image-viewing';
import { useIsFocused } from '@react-navigation/native';

const UserProfilePosts = ({ userPosts }) => {
  const playerRef = useRef({});
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const isFocused = useIsFocused();

  const renderPostContent = (post) => {
    if (post.post_type === 'Video') {
      return (
        <VideoPlayer
          ref={(ref) => (playerRef.current[post.id] = ref)}
          customStyles={{
            wrapper: { alignSelf: 'center', width: '100%', overflow: 'hidden' },
            video: { borderRadius: 10,backgroundColor: 'black' },
            videoWrapper: { borderRadius: 10 },
          }}
          endWithThumbnail
          thumbnail={{ uri: post.thumbnail_link }}
          source={{ uri: post.postVideo || post.video_link }}
          onError={(e) => console.log(e)}
          showDuration={true}
          repeat={true}
          paused={!isFocused}
          fullScreenOnLongPress={true}
        />
      );
    }
    if (post.image_link) {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setSelectedImage(post.image_link);
            setIsImageViewerVisible(true);
          }}
        >
          <Image
            source={{ uri: post.image_link }}
            style={{ height: 300, width: '100%', borderRadius: 10 }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <>
      <ScrollView className="p-3">
        {userPosts?.map((post, index) => (
          <View
            key={index}
            className="p-4 bg-white mb-[30px] rounded-2xl"
            style={{
              elevation: 8, // Android elevation
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.15,
              shadowRadius: 3.84,
            }}
          >
            <View className="flex-row items-center p-2">
              <Image
                source={{ uri: post.uploader_details.profile_picture }}
                className="w-10 h-10 rounded-full"
              />
              <Text className="ml-3 font-semibold">{post.uploader_details.user_name}</Text>
              <Text className="ml-auto text-gray-500">{post.post_uploaded_ago}</Text>
            </View>
            {renderPostContent(post)}
            <View className="p-4">
              <Text className="font-bold mb-2">{post.title}</Text>
              {post.description !== 'No description provided' && (
                <Text className="text-gray-600">{post.description}</Text>
              )}
              <View className="flex-row mt-2">
                <Text className="mr-4">Likes: {post.likes}</Text>
                <Text>Shares: {post.shares}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {selectedImage && (
        <ImageViewing
          images={[{ uri: selectedImage }]}
          imageIndex={0}
          visible={isImageViewerVisible}
          onRequestClose={() => setIsImageViewerVisible(false)}
        />
      )}
    </>
  );
};

export default UserProfilePosts;