import React from 'react'
import { useState, useLayoutEffect } from 'react';
import loginBackground from '../../assets/loginBackground.jpg';

function RegisterBackground() {
  const [imageClass, setImageClass] = useState('absolute');
  
    useLayoutEffect(() => {
      const updateClass = () => {
        if (window.innerWidth >= 1280 ) { 
          setImageClass('h-screen');
        } else {
          setImageClass('absolute');
        }
      };
  
      updateClass(); // Run on mount
      window.addEventListener('resize', updateClass);
  
      return () => window.removeEventListener('resize', updateClass);
    }, []);
  
    return (
      <div className='h-[150px] h-xr:h-[220px] md:h-[250px] overflow-hidden rounded-b-3xl relative xl:h-full xl:rounded-none xl:w-[50%]'>
        <img 
          src={loginBackground} 
          alt="loginBackground"
          className={`${imageClass} top-0 left-0 w-full h-full object-cover`}
        />
      </div>
    );
}

export default RegisterBackground