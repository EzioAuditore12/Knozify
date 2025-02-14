import { View, Text } from 'react-native'
import React from 'react'


const PostNumber=({userPosts})=>{
    return(
        <View>
        <Text className='text-2xl text-center font-bold'>{userPosts}</Text>
        <Text className='text-center'>Posts</Text>
        </View>
    )
}

const FollowerNumber=({userFollowers})=>{
    return(
        <View>
        <Text className='text-2xl text-center font-bold'>{userFollowers}</Text>
        <Text className='text-center'>Followers</Text>
        </View>
    )
}

const NumberOfFollowing=({numOffollowing})=>{
    return(
        <View>
        <Text className='text-2xl text-center font-bold'>{numOffollowing}</Text>
        <Text className='text-center'>Following</Text>
        </View>
    )
}

const UserDetails = ({userDetails}) => {
  return (
    <View 
      className='flex-row justify-between w-full px-8 mt-[20px] p-2 elevation-5 '
    >
      <PostNumber userPosts={userDetails.posts}/>
      <FollowerNumber userFollowers={userDetails.followers} />
      <NumberOfFollowing numOffollowing={userDetails.following}/>
    </View>
  )
}

export default UserDetails