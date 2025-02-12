import React, { createContext, useContext, useState, useEffect } from 'react';

const MediumDeviceContext = createContext();

export function MediumDeviceProvider({ children }) {
  const [isMediumDevice, setIsMediumDevice] = useState(
    window.innerWidth >=768 && window.innerWidth <1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMediumDevice(window.innerWidth>=768 && window.innerWidth <1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MediumDeviceContext.Provider value={{ isMediumDevice, setIsMediumDevice }}>
      {children}
    </MediumDeviceContext.Provider>
  );
}

export function useMediumDevice() {
  const context = useContext(MediumDeviceContext);
  if (context === undefined) {
    throw new Error('useMediumDevice must be used within a MediumDeviceProvider');
  }
  return context;
} 