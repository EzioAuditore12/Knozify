import React from 'react';
import { MobileProvider, useMobile } from './Device_Sizes/MobileContext';
import { MediumDeviceProvider, useMediumDevice } from './Device_Sizes/MediumDeviceContext';
import { LargeDeviceProvider, useLargeDevice } from './Device_Sizes/LargeDeviceContext';
import { ExtraLargeDeviceProvider,useExtraLargeDevice } from './Device_Sizes/ExtraLargeDeviceContext';
export { useMobile, useMediumDevice, useLargeDevice };

export const ResponsiveProvider = ({ children }) => {
  return (
    <MobileProvider>
      <MediumDeviceProvider>
        <LargeDeviceProvider>
        <ExtraLargeDeviceProvider>
          {children}
        </ExtraLargeDeviceProvider>
        </LargeDeviceProvider>
      </MediumDeviceProvider>
    </MobileProvider>
  );
};