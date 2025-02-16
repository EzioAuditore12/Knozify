import React, { useState,useEffect } from 'react'  // <-- added useState
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

import { useSelector } from 'react-redux'

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


//User API
import { getUserDetails } from '../../api/Profile/profile.details'
import { getUserPosts } from '../../api/Profile/profile.getPosts'

const ProfileTabs = createMaterialTopTabNavigator()

const UserProfile = () => {
  const [gradientHeight, setGradientHeight] = useState(0)
  const { user } = useSelector((state) => state.auth)
  const [userDetails, setUserDetails] = useState({})
  const [userPosts, setUserPosts] = useState([])

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

  // MyTabsProfile moved inside UserProfile to access userPosts
  const MyTabsProfile = () => {
    return (
      <ProfileTabs.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'white',

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
            tabBarLabel: `Posts ${userPosts?.length ? `(${userPosts.length})` : ''}`
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

  const onGradientLayout = (event) => {
    const { height } = event.nativeEvent.layout
    setGradientHeight(height)
  }

  const fetchUserDetails = async () => {
    try {
      const result = await getUserDetails(user._id)
      setUserDetails(result.data)
    } catch (err) {
      console.error("Error fetching user details:", err.response ? err.response.data : err.message)
    }
  }

  const fetchUserPosts = async () => {
    try {
      const posts = await getUserPosts(user._id);
      setUserPosts(posts);
    } catch (err) {
      console.error("Error fetching user posts:", err.response ? err.response.data : err.message);
    }
  }

  useEffect(() => {
    if (user && user._id) {
      fetchUserDetails()
      fetchUserPosts()
    }
  }, [])

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header Section */}
      <LinearGradient
        onLayout={onGradientLayout}
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
        className="items-center"  // Removed flex-1 to let content stack naturally
      >
        {/* ...existing code... */}
        <ProfileHeader userDetails={userDetails} />
        <UserAvatar userDetails={{
          user_name: userDetails.user_name,
          profile_picture: userDetails.profile_picture
        }} />
        <UserDetails
          userDetails={{
            posts: userDetails.post_counts,
            followers: userDetails.follower_counts,
            following: userDetails.following_counts
          }}
        />
      </LinearGradient>
      <MyTabsProfile />
    </ScrollView>
  )
}

export default UserProfile