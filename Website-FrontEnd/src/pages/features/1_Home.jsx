import React from 'react'
import UserStories from '../../components/1_Home/UserStories'
import UserPosts from '../../components/1_Home/UserPosts';
import SearchFriends from '../../components/1_Home/searchFriends';

const Home = () => {
  return (
    <div className='mt-16 md:ml-[80px] mb-[50px] relative'>
      <UserStories/>
      <UserPosts/>
      <SearchFriends/>
    </div>
  )
}

export default Home