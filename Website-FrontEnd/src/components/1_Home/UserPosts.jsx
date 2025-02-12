import React from 'react'


const Posts=()=>{
    return(
        <div className='flex flex-col space-y-4 p-4 max-w-[777px]'>
            <div className='h-[500px] w-full bg-white rounded-lg p-2'>
                {/* User Image */}
                <div className='flex justify-between items-center p-2'>
                    <div className='flex items-center'>
                        <img src='https://i.pravatar.cc/150?img=1' alt='User' className='h-10 w-10 rounded-full'/>
                        <span className='ml-2 font-semibold'>User Name</span>
                    </div>
                </div>

                {/* Post Image */}

                <img src='https://i.pravatar.cc/150?img=1' alt='Post' className='h-[300px] w-full object-cover'/>

                {/* Post Description */}
                <div className='p-2'>
                    <span className='font-semibold'>User Name</span>
                    <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                </div>    
            </div>
        </div>
    )
}




function UserPosts() {
  return (
    <>
        <h1 className='text-lg font-semibold text-gray-700 mx-4'>Posts</h1>
        <Posts/>
    </>
  )
}

export default UserPosts