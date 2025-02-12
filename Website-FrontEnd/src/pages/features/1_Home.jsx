import React from 'react'
import UserStories from '../../components/1_Home/UserStories'
import UserPosts from '../../components/1_Home/UserPosts';
import SearchFriends from '../../components/1_Home/searchFriends';
import { useMediumDevice } from '../../contexts';
import { useLargeDevice } from '../../contexts';
import { useExtraLargeDevice } from '../../contexts/Device_Sizes/ExtraLargeDeviceContext';


const Home = () => {
  const { isMediumDevice } = useMediumDevice();
  const {isLargeDevice} = useLargeDevice(); 
  const {isExtraLargeDevice} = useExtraLargeDevice();
  return (
    <div className='mt-16 md:ml-[80px] mb-[50px] relative'>

    <div className='flex flex-col md:mr-[100px]'>
      <UserStories/>
      <UserPosts/>
    </div>  
      {(isMediumDevice || isLargeDevice || isExtraLargeDevice) && <SearchFriends/>}
    </div>
  )
}

export default Home