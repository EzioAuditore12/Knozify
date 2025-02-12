import React, { createContext, useContext, useState, useEffect } from 'react';

const LargeDeviceContext = createContext();

export function LargeDeviceProvider({ children }) {
  const [isLargeDevice, setIsLargeDevice] = useState(window.innerWidth >=1024 && window.innerWidth<1280);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeDevice(window.innerWidth >=1024 && window.innerWidth<1280);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <LargeDeviceContext.Provider value={{ isLargeDevice, setIsLargeDevice }}>
      {children}
    </LargeDeviceContext.Provider>
  );
}

export function useLargeDevice() {
  const context = useContext(LargeDeviceContext);
  if (context === undefined) {
    throw new Error('useLargeDevice must be used within a LargeDeviceProvider');
  }
  return context;
}
