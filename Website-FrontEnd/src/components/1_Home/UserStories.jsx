import React from 'react'

function UserBox() {
    const users = [
        { id: 1, image: 'https://i.pravatar.cc/150?img=1', status: 'Online' },
        { id: 2, image: 'https://i.pravatar.cc/150?img=2', status: 'Offline' },
        { id: 3, image: 'https://i.pravatar.cc/150?img=3', status: 'Busy' },
        { id: 4, image: 'https://i.pravatar.cc/150?img=4', status: 'Away' },
        { id: 5, image: 'https://i.pravatar.cc/150?img=5', status: 'Online' },
        { id: 6, image: 'https://i.pravatar.cc/150?img=6', status: 'Offline' },
        { id: 7, image: 'https://i.pravatar.cc/150?img=7', status: 'Busy' },
    ]

    return (
        <div className='flex flex-row overflow-x-scroll snap-x snap-mandatory w-full bg-white p-2 rounded-lg shadow-md scrollbar-hide'>
            {users.map(user => (
                <div key={user.id} className='snap-start flex-shrink-0 w-[110px] flex flex-col items-center'>
                    <img 
                        src={user.image}
                        alt='User'
                        className='h-[100px] w-[100px] rounded-lg'
                    />
                    <span className='mt-1 text-xs'>{user.status}</span>
                </div>
            ))}
        </div>
    )
}

function UserStories() {
  return (
    <>
      <h1 className='px-4 text-xl font-semibold text-gray-700'>Stories</h1>
      <UserBox/>
    </>
  )
}

export default UserStories