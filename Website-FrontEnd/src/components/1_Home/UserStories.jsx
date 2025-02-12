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
        { id: 8, image: 'https://i.pravatar.cc/150?img=8', status: 'Online' },
        { id: 9, image: 'https://i.pravatar.cc/150?img=9', status: 'Away' },
        { id: 10, image: 'https://i.pravatar.cc/150?img=10', status: 'Online' },
        { id: 11, image: 'https://i.pravatar.cc/150?img=11', status: 'Busy' },
        { id: 12, image: 'https://i.pravatar.cc/150?img=12', status: 'Offline' },
        { id: 13, image: 'https://i.pravatar.cc/150?img=13', status: 'Online' },
        { id: 14, image: 'https://i.pravatar.cc/150?img=14', status: 'Away' },
        { id: 15, image: 'https://i.pravatar.cc/150?img=15', status: 'Online' }
    ]

    return (
        <div className='flex flex-row overflow-x-scroll snap-x snap-mandatory w-full bg-white p-2 rounded-lg shadow-md scrollbar-hide mr-16'>
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