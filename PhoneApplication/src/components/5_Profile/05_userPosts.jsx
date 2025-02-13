import { View, Text, Image, Modal, TouchableOpacity, BackHandler } from 'react-native'
import React,{useRef, useState, useEffect, useCallback} from 'react'
import VideoPlayer from 'react-native-video-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
 import Icon2 from 'react-native-vector-icons/Ionicons'

const UserProfilePosts = ({ userPosts = [] }) => { 

  if (!userPosts?.length) return null 
  const playerRef = useRef({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPlaying, setIsPlaying] = useState({});

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (modalVisible) {
        setModalVisible(false);
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [modalVisible]);

  useEffect(() => {
    // Initialize all videos as playing
    const initialPlayState = {};
    userPosts.forEach(post => {
      if (post.postVideo) {
        initialPlayState[post.id] = true;
      }
    });
    setIsPlaying(initialPlayState);
  }, [userPosts]);

  const handleLongPress = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    viewableItems.forEach((viewableItem) => {
      const postId = viewableItem.item.id;
      setIsPlaying((prev) => ({
        ...prev,
        [postId]: viewableItem.isViewable,
      }));
    });
  }, []);

  return (
    <>
        <View className='flex-row items-center px-4 gap-x-1 mb-[20px]'>
                <Text className='text-lg font-semibold text-gray-600'>Posts</Text>
                <Icon2 name='grid' size={20} color='#64748b'/>
             </View>
    <View className='mb-[60px]'>
      {userPosts.map((post, index) => (
        <View 
          key={index} 
          className='p-4 bg-white mb-2 rounded-2xl'
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
          {/* Header */}
          <View className='flex-row gap-x-2 items-center mb-3'>
            <Image
              source={{ uri: post.userAvatar }}
              className='h-10 w-10 rounded-full'
            />
            <View>
              <Text className='font-semibold'>{post.userName}</Text>
              <Text className='text-gray-500 text-xs'>{post.timestamp}</Text>
            </View>
          </View>


            {post.postVideo ? (
                <VideoPlayer
            ref={(ref) => (playerRef.current[post.id] = ref)}
            customStyles={{
              wrapper: {
                alignSelf: 'center',
                width: '100%', 
                overflow: 'hidden',
              },
              video: {
                borderRadius: 10,
              },
            }}
            endWithThumbnail
            thumbnail={{
              uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
            }}
            source={{
              uri: post.postVideo,
            }}
            onError={(e) => console.log(e)}
            showDuration={true}
            autoplay={isPlaying[post.id]}
            paused={!isPlaying[post.id]}
            repeat={true}
            fullScreenOnLongPress={true}
          />
            ):null
      }

      {
        post.postImage && (
          <TouchableOpacity onLongPress={() => handleLongPress(post.postImage)}>
            <Image
              source={{ uri: post.postImage }}
              className='h-60 w-full object-cover rounded-md'
            />
          </TouchableOpacity>
        )
      }


          {/* Content */}
          <View className='mb-3'>
            <Text className='font-semibold mb-1'>{post.postTitle}</Text>
              {/* Tags */}
        
            <View className='flex-row flex-wrap gap-2 mb-3'>
            {post.postTags.map((tag, index) => (
              <Text key={index} className='text-blue-500'>{tag}</Text>
            ))}

          </View>
            <Text>{post.postContent}</Text>
          </View>

        
          

          {/* Stats */}
          <View className='flex-row justify-between border-t border-gray-200 pt-3'>
            <Text>{post.likes} likes</Text>
            <Text>{post.comments.length} comments</Text>
            <Text>{post.shares} shares</Text>
          </View>
        </View>
      ))}
      {/* Modal for Full-Screen Image Preview */}
      <Modal 
        visible={modalVisible} 
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)} 
          className='flex-1 bg-black'
        >
          <TouchableOpacity 
            className='absolute top-10 right-5 z-50 p-2' 
            onPress={() => setModalVisible(false)}
          >
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <Image 
            source={{ uri: selectedImage }} 
            className='h-full w-full object-contain' 
          />
        </TouchableOpacity>
      </Modal>
    </View>
    </>
  )
}

export default UserProfilePosts