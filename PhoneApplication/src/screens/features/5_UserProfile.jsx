import React, { useState } from 'react'  // <-- added useState
import { View, Text, ScrollView, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

// components
import ProfileHeader from '../../components/5_Profile/01_profileHeader'
import UserAvatar from '../../components/5_Profile/02_userAvatar'
import UserDetails from '../../components/5_Profile/03_userDetails'
import UserStories from '../../components/5_Profile/04_userStories'
import UserProfilePosts from '../../components/5_Profile/05_userPosts'
import UserReels from '../../components/5_Profile/06_userReels'

const userDetails = {
  userName: 'Daksh',
  userAvatar:
    'https://res.cloudinary.com/dpcloud123/image/upload/v1737164154/avmrjdkmjr116rxu5uis.jpg',
  userWalletPoints: 100,
  userCustomName: '@dakshpurohit',
  Following: 100,
  Posts: 29,
  Followers: 1000
}

const userStatus = [
  {
    userName: 'Daksh',
    userAvatar:
      'https://res.cloudinary.com/dpcloud123/image/upload/v1737164154/avmrjdkmjr116rxu5uis.jpg'
  },
  {
    userName: 'Manas',
    userAvatar:
      'https://res.cloudinary.com/dpcloud123/image/upload/v1737165276/gbykpdwgflraoypp9rsi.jpg'
  },
  {
    userName: 'Vikas',
    userAvatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    userName: 'Rahul',
    userAvatar: 'https://i.pravatar.cc/150?img=4'
  },
  {
    userName: 'Priya',
    userAvatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    userName: 'Neha',
    userAvatar: 'https://i.pravatar.cc/150?img=6'
  },
  {
    userName: 'Amit',
    userAvatar: 'https://i.pravatar.cc/150?img=7'
  },
  {
    userName: 'Anjali',
    userAvatar: 'https://i.pravatar.cc/150?img=8'
  },
  {
    userName: 'Raj',
    userAvatar: 'https://i.pravatar.cc/150?img=9'
  },
  {
    userName: 'Meera',
    userAvatar: 'https://i.pravatar.cc/150?img=10'
  },
  {
    userName: 'Arjun',
    userAvatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    userName: 'Kavita',
    userAvatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    userName: 'Rohit',
    userAvatar: 'https://i.pravatar.cc/150?img=13'
  },
  {
    userName: 'Nisha',
    userAvatar: 'https://i.pravatar.cc/150?img=14'
  },
  {
    userName: 'Arun',
    userAvatar: 'https://i.pravatar.cc/150?img=15'
  },
  {
    userName: 'Pooja',
    userAvatar: 'https://i.pravatar.cc/150?img=16'
  },
  {
    userName: 'Karan',
    userAvatar: 'https://i.pravatar.cc/150?img=17'
  },
  {
    userName: 'Sanya',
    userAvatar: 'https://i.pravatar.cc/150?img=18'
  },
  {
    userName: 'Vivek',
    userAvatar: 'https://i.pravatar.cc/150?img=19'
  },
  {
    userName: 'Ritu',
    userAvatar: 'https://i.pravatar.cc/150?img=20'
  }
]

const userPosts = [
  {
    id: '1',
    userName: 'Daksh',
    userAvatar:
      'https://res.cloudinary.com/dpcloud123/image/upload/v1737164154/avmrjdkmjr116rxu5uis.jpg',
    postVideo:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    timestamp: '30 mins ago',
    postTitle: 'Beautiful Morning!',
    postContent:
      'Starting my day with a perfect cup of coffee ☕ and getting ready to code',
    postTags: ['#coding', '#react', '#react native'],
    likes: 10,
    comments: [],
    shares: 2
  },
  {
    id: '2',
    userName: 'Manas',
    userAvatar:
      'https://res.cloudinary.com/dpcloud123/image/upload/v1737165276/gbykpdwgflraoypp9rsi.jpg',
    timestamp: '1 hour ago',
    postImage:
      'https://res.cloudinary.com/dpcloud123/image/upload/v1737170301/twbxmfx4bevi0usu8cst.png',
    postTitle: 'New Project Alert!',
    postContent:
      'Just started working on a new project. Stay tuned for more updates!',
    postTags: ['#django', '#backend'],
    likes: 25,
    comments: [],
    shares: 5
  },
  {
    id: '3',
    userName: 'Vikas',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    postImage: '',
    timestamp: '2 hours ago',
    postTitle: 'Weekend Vibes!',
    postContent: 'Enjoying the weekend with my friends. #weekendvibes',
    postTags: ['#weekend', '#friends'],
    likes: 30,
    comments: [],
    shares: 10
  }
]

const windowHeight = Dimensions.get('window').height

const ProfileTabs = createMaterialTopTabNavigator()

// Wrapper component for posts screen
const PostsWrapper = () => (
    <View style={{ flex: 1 }}>
      <UserProfilePosts userPosts={userPosts} />
    </View>
  )

const ReelsWrapper = () => (
    <View style={{ flex: 1 }}>
      <UserReels />
    </View>
  )

  function MyTabsProfile() {
    return (
      <ProfileTabs.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'white',
            elevation: 0,
            shadowOpacity: 0
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#9AE6C6',
            height: 3
          },
          tabBarLabelStyle: {
            color: 'black',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }
        }}
      >
        <ProfileTabs.Screen
          name="Posts"
          component={PostsWrapper}
          options={{
            tabBarLabel: `Posts (${userPosts.length})`
          }}
        />
        <ProfileTabs.Screen 
          name="Reels" 
          component={ReelsWrapper} 
          options={{ tabBarLabel: 'Reels' }}
        />
      </ProfileTabs.Navigator>
    )
  }
  
  const UserProfile = () => {
    const [gradientHeight, setGradientHeight] = useState(0)

    const onGradientLayout = (event) => {
      const { height } = event.nativeEvent.layout
      setGradientHeight(height)
    }

    return (
      <ScrollView contentContainerStyle={{ flexGrow:1, height: gradientHeight }}>
        <View className="flex-1">
          <LinearGradient
            onLayout={onGradientLayout} // <-- added onLayout handler
            colors={[
              '#9AE6C6',
              '#A6E9CD',
              '#B2ECD4',
              '#BEEFDA',
              '#D7F5E9',
              '#F1FBF7',
              'white',
              'white',
              'white',
              'white',
              'white'
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="flex-1 items-center"
          >
            <View className="items-center mb-[20px]">
              <ProfileHeader userDetails={userDetails} />
              <UserAvatar userAvatar={userDetails.userAvatar} />
              <UserDetails
                userDetails={{
                  posts: userDetails.Posts,
                  followers: userDetails.Followers,
                  following: userDetails.Following
                }}
              />
            </View>
            {/*<UserStories stories={userStatus} />*/}
          </LinearGradient>
    
          {/* Tab Navigator Container */}
          <View className='flex-1'>
            <MyTabsProfile />
          </View>
        </View>
      </ScrollView>
    )
  }

export default UserProfile