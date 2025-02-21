import React, { useState, useEffect ,useCallback} from 'react'
import { View, Text, ScrollView, Dimensions ,RefreshControl } from 'react-native'
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
import { getUserReels } from '../../api/Profile/profile.getReels'

const ProfileTabs = createMaterialTopTabNavigator()

const PostsWrapper = ({ userPosts }) => (
  <View style={{ flex: 1 }}>
    <UserProfilePosts userPosts={userPosts} />
  </View>
)

const ReelsWrapper = ({userReels}) => (
  <View style={{ flex: 1 }}>
    <UserReels userReels={userReels}/>
  </View>
)


const MyTabsProfile = ({ postCount, userPosts, reelCount,userReels }) => {
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
        children={() => <PostsWrapper userPosts={userPosts} />}
        options={{
          tabBarLabel: `Posts ${postCount ? `(${postCount})` : ''}`
        }}
      />
      <ProfileTabs.Screen
        name="Reels"
        children={() => <ReelsWrapper userReels={userReels} />}
        options={{ 
          tabBarLabel: `Reels ${reelCount ? `(${reelCount})` : ''}`
          }}   
      />
    </ProfileTabs.Navigator>
  )
}

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth)
  const [profile, setProfile] = useState({ details: {}, posts: [],reels: [] })

  const fetchUserDetails = async () => {
    try {
      const result = await getUserDetails(user._id)
      setProfile(prev => ({
        ...prev,
        details: result.data
      }))
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
      setProfile(prev => ({
        ...prev,
        posts: posts
      }))
    } catch (err) {
      console.error(
        "Error fetching user posts:",
        err.response ? err.response.data : err.message
      )
    }
  }

  const fetchUserReels = async () => {
    try {
      const reels = await getUserReels(user._id)
      setProfile(prev => ({
        ...prev,
        reels: reels
      }))
    } catch (err) {
      console.error(
        "Error fetching user reels:",
        err.response ? err.response.data : err.message
      )
    }
  }

  useEffect(() => {
    if (user?._id) {
      fetchUserDetails()
      fetchUserPosts()
      fetchUserReels()
    }
  }, [])

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      fetchUserDetails(),
      fetchUserPosts(),
      fetchUserReels()
    ]).finally(() => {
      setRefreshing(false);
    });
  }, []);

  const ProfileSection = () => (
    <ScrollView 
      contentContainerStyle={{ 
        flexGrow: 0,
        paddingBottom: 0,
        marginBottom: 0  
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      scrollEnabled={true}
      nestedScrollEnabled={true}
      style={{ flexGrow: 0 }}
    >
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
        style={{ marginBottom: 0 }} 
      >
        <ProfileHeader userDetails={profile.details} />
        <UserAvatar
          userDetails={{
            user_name: profile.details.user_name,
            profile_picture: profile.details.profile_picture
          }}
        />
        <UserDetails
          userDetails={{
            posts: profile.details.post_counts,
            followers: profile.details.follower_counts,
            following: profile.details.following_counts
          }}
        />
      </LinearGradient>
    </ScrollView>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ProfileSection />
      <MyTabsProfile
        postCount={profile.posts.length}
        userPosts={profile.posts}
        reelCount={profile.reels.length}
        userReels={profile.reels}
      />
    </View>
  );
}

export default UserProfile