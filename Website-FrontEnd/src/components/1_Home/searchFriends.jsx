import React from 'react'
import { FaSearch } from 'react-icons/fa'

const friends = [
    {
        id: 1,
        name: 'John Doe',
        profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
        status: 'Online'
    },
    {
        id: 2,
        name: 'Jane Smith',
        profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
        status: 'Offline'
    },
    {
        id: 3,
        name: 'Mike Johnson',
        profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
        status: 'Online'
    },
    {
        id: 4,
        name: 'Sarah Williams',
        profilePic: 'https://randomuser.me/api/portraits/women/4.jpg',
        status: 'Away'
    },
    {
        id: 5,
        name: 'David Brown',
        profilePic: 'https://randomuser.me/api/portraits/men/5.jpg',
        status: 'Busy'
    }
]

function SearchFriends() {
  return (
    <div className='fixed mt-16 w-[100px] bg-white right-0 top-0 shadow-md h-screen'>
      <div className='flex flex-col items-center gap-4 p-4'>
        <div className='p-2 hover:bg-gray-100 rounded-full cursor-pointer'>
          <FaSearch className='w-6 h-6 text-gray-600' />
        </div>
        
        {friends.map(friend => (
          <div key={friend.id} className='relative cursor-pointer'>
            <img 
              src={friend.profilePic}
              alt={friend.name}
              className='w-12 h-12 rounded-full'
            />
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
              ${friend.status === 'Online' ? 'bg-green-500' : 
                friend.status === 'Busy' ? 'bg-red-500' : 
                friend.status === 'Away' ? 'bg-yellow-500' : 'bg-gray-500'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchFriends