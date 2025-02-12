import React from 'react'
import { FaMoon } from "react-icons/fa";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { IoHomeSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { SiYoutubeshorts } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

function User(){
  return(
    <div>
      <div className='flex items-center gap-x-2'>
          <FaUserCircle className='text-2xl'/>
          <p>Username</p>
      </div>
    </div>
  )
}



function Header() {
  return (
    <div className='fixed top-0 left-0 w-full z-50'>
    <div className='flex items-center justify-between h-16 bg-green-500 text-white p-2 shadow-2xl'>
        <div className='flex items-center  gap-x-2'>
            <h1 className='text-2xl font-bold'>Knozify</h1>
        </div>
        <div className='flex gap-x-2 items-center'>
            
            <FaMoon className='text-2xl'/>
            <FaMessage className='text-2xl'/>
        </div>
    </div>
    </div>
  )
}

function BottomBar() {
    return (
      <div className='fixed bottom-0 w-full h-12 bg-white text-gray-700 p-2 shadow-2xl 
                      md:w-auto md:h-screen md:top-16 md:left-0 md:px-6'>
        <div className='flex justify-evenly items-center md:flex-col md:h-[85%]'>
          <IoHomeSharp className='text-2xl'/>
          <FaSearch className='text-2xl'/>
          <IoAddCircle className='text-2xl'/>
          <SiYoutubeshorts className='text-2xl'/>
          <FaUserCircle className='text-2xl'/>
        </div>
      </div>
    )
  }


function SideDrawer(){
    return(
        <>
      
        </>
    )
}  

function AppLayout({children}){
    return(
        <div>
            <Header/>
            {children}
            <BottomBar/>
        </div>
    )
}


export default AppLayout