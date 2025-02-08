import React, { useState, useLayoutEffect } from 'react';
import loginBackground from '../assets/loginBackground.jpg';

function LoginBackground() {
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
    <div className='h-[250px] h-xr:h-[500px] md:h-[350px] overflow-hidden rounded-b-3xl relative xl:h-screen xl:rounded-none xl:w-[50%]'>
      <img 
        src={loginBackground} 
        alt="loginBackground"
        className={`${imageClass} top-0 left-0 w-full h-full object-cover`}
      />
    </div>
  );
}

export default LoginBackground;
