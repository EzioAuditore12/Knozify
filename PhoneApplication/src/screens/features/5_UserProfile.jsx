import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSelector } from 'react-redux'

import ProfileHeader from '../../components/5_Profile/01_profileHeader'
import UserAvatar from '../../components/5_Profile/02_userAvatar'
import UserDetails from '../../components/5_Profile/03_userDetails'
import UserStories from '../../components/5_Profile/04_userStories'
import UserProfilePosts from '../../components/5_Profile/05_userPosts'
import UserReels from '../../components/5_Profile/06_userReels'

import { getUserDetails } from '../../api/Profile/profile.details'
import { getUserPosts } from '../../api/Profile/profile.getPosts'

const ProfileTabs = createMaterialTopTabNavigator()

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth)
  const [userDetails, setUserDetails] = useState({})
  const [userPosts, setUserPosts] = useState([])

  const fetchUserDetails = async () => {
    try {
      const result = await getUserDetails(user._id)
      setUserDetails(result.data)
    } catch (err) {
      console.error(
        "Error fetching user details:",
        err.response ? err.response.data : err.message
      )
    }
  }

  const fetchUserPosts = async () => {
    try {
      const posts = await getUserPosts(user._id)
      setUserPosts(posts)
    } catch (err) {
      console.error(
        "Error fetching user posts:",
        err.response ? err.response.data : err.message
      )
    }
  }

  useEffect(() => {
    if (user && user._id) {
      fetchUserDetails()
      fetchUserPosts()
    }
  }, [user])

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

  const MyTabsProfile = () => {
    return (
      <ProfileTabs.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: 'white', shadowOpacity: 0 },
          tabBarIndicatorStyle: { backgroundColor: '#9AE6C6', height: 3 },
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

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header Section */}
      <LinearGradient
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
        className="items-center"
      >
        <ProfileHeader userDetails={userDetails} />
        <UserAvatar
          userDetails={{
            user_name: userDetails.user_name,
            profile_picture: userDetails.profile_picture
          }}
        />
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