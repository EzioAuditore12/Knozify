

## Installation and Setup

You can follow and install the required packages with

 For more detail you can look in dependencies and dev dependecies in package.json

```
npm install
```

### Manual Setup

1. NativeWind 
    
    You can follow the docs here in case of any error:-
    https://www.nativewind.dev/getting-started/react-native

    1. Install the following packages:-

    ```bash
    npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
    ```
    2. Make a tailwind config file

    ```bash
    npx tailwindcss init
    ```

    3. Update configurations in tailwind.config.js by adding required paths

        1. If you ar using bash terminal you can directly run this command:

        ```bash
        cat > tailwind.config.js <<EOL
        /** @type {import('tailwindcss').Config} */
          module.exports = {
          // NOTE: Update this to include the paths to all of your component files.
          content: [
          "./App.{js,jsx,ts,tsx}",
          ],
          presets: [require("nativewind/preset")],
          theme: {
          extend: {},
          },
          plugins: [],
          }
        EOL
        ```

        2. Else, you can add path in conten file manually of your app

        ```js
        content: [
          "./App.{js,jsx,ts,tsx}",
        ],
        ```

        Add the required presets

        ```js
        presets: [require("nativewind/preset")],
        ```
    
    4. Create a global css file

        1. If you are using bash, you can directly write these commands

        ```bash
        echo "@tailwind base;" > global.css
        echo "@tailwind components;" >> global.css
        echo "@tailwind utilities;" >> global.css
        ```

        2. Else , you can create a global.css and add these in it

        ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```

    5. Update the babel.config.js
        
        1. If you are using bash , you can directly write these commands

        ```bash
        cat > babel.config.js <<EOL
        module.exports = {
        presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
        };
        EOL
        ```

        2. For manually just add the nativewind/babel in babel.config.js

        ```js
        presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
        ```
    
    6. Update the metro.config.js

         1. If you are using bash , you can directly write these commands

         ```bash
          cat > metro.config.js <<EOL
          const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
          const { withNativeWind } = require("nativewind/metro");

          const config = mergeConfig(getDefaultConfig(__dirname), {
          /* your config */
          });

          module.exports = withNativeWind(config, { input: "./global.css" });
         EOL
         ```
         2. For manually, just add these lines inside metro.config.js

         ```js
          const { withNativeWind } = require("nativewind/metro");
          const config = mergeConfig(getDefaultConfig(__dirname), {
          /* your config */
          });

          module.exports = withNativeWind(config, { input: "./global.css" });
         ```
    7. Create a nativwind environment in case of typescript
         
         1. If you are using bash , you can directly write these commands

         ```bash
         echo "/// <reference types=\"nativewind/types\" />" > nativewind-env.d.ts
         ```
         2. In case of manually just create a file named nativewind-env.d.ts and paste following line
         
         ```ts
        /// <reference types="nativewind/types" />
         ```

    8. Now you can verify that nativeWind is working or not by just trying this in App.tsx and the background colour will change

    ```tsx
    import { View, Text } from 'react-native'
    import React from 'react'
    import "../global.css"

    const App = () => {
    return (
    <View className='flex-1 justify-center items-center bg-red-500'>
      <Text className='text-3xl text-center'>App initialized with nativeWind</Text>
    </View>
    )
    }

    export default App
    ```



