import React, { createContext, useContext, useState, useEffect } from 'react';

const ExtraLargeDeviceContext = createContext();

export function ExtraLargeDeviceProvider({ children }) {
  const [isExtraLargeDevice, setExtraLargeDevice] = useState(
    window.innerWidth >=1280
  );

  useEffect(() => {
    const handleResize = () => {
      setExtraLargeDevice(window.innerWidth>=1280 );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ExtraLargeDeviceContext.Provider value={{ isExtraLargeDevice, setExtraLargeDevice }}>
      {children}
    </ExtraLargeDeviceContext.Provider>
  );
}

export function useExtraLargeDevice() {
  const context = useContext(ExtraLargeDeviceContext);
  if (context === undefined) {
    throw new Error('useMediumDevice must be used within a MediumDeviceProvider');
  }
  return context;
} 