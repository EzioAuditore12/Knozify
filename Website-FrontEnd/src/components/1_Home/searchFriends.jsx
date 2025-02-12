import React from 'react'







function SearchFriends() {
  return (
    <div className='fixed h-screen w-80 bg-white right-0 top-0 shadow-md'>
        <div className='flex flex-col p-4'>
            <input type='text' placeholder='Search Friends' className='p-2 border border-gray-200 rounded-lg'/>
            <div className='flex flex-col space-y-2 mt-4'>
                <div className='flex items-center'>
                    <img src='https://i.pravatar.cc/150?img=1' alt='User' className='h-10 w-10 rounded-full'/>
                    <span className='ml-2 font-semibold'>User Name</span>
                </div>
                <div className='flex items-center'>
                    <img src='https://i.pravatar.cc/150?img=2' alt='User' className='h-10 w-10 rounded-full'/>
                    <span className='ml-2 font-semibold'>User Name</span>
                </div>
                <div className='flex items-center'>
                    <img src='https://i.pravatar.cc/150?img=3' alt='User' className='h-10 w-10 rounded-full'/>
                    <span className='ml-2 font-semibold'>User Name</span>
                </div>
                <div className='flex items-center'>
                    <img src='https://i.pravatar.cc/150?img=4' alt='User' className='h-10 w-10 rounded-full'/>
                    <span className='ml-2 font-semibold'>User Name</span>
                </div>
                <div className='flex items-center'>
                    <img src='https://i.pravatar.cc/150?img=5' alt='User' className='h-10 w-10 rounded-full'/>
                    <span className='ml-2 font-semibold'>User Name</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchFriends