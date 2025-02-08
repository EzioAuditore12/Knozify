

## Installation and Setup

You can follow and install the required packages with

 For more detail you can look in dependencies and dev dependecies in package.json

```
npm install
```

### Manual Setup:-

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

    8. Now you can verify that nativeWind is working or not by just trying this in App.tsx and the background colour will change to red

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


  2. React-Native-Vector-Icons

    1. Install the following package:-

      ```bash
      npm install --save react-native-vector-icons
      ``` 

      For Icons Refrence , you can use:-
      https://oblador.github.io/react-native-vector-icons/

    2. Now in android android/app/build.gradle and add this

      ```gradle
      apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
      ```

  3. React-Native-Navigation

    You can follow the docs here of React-Navigation for more :- 
    https://reactnavigation.org/docs/getting-started
    
    1. Install the follwing packages:-
   
      ```bash
      npm install @react-navigation/native
      npm install react-native-screens react-native-safe-area-context
      ```

    2. Now there are different types of Navigation, we are going to use 2 right now as mentioned:-

        1. Bottom Tabs Navigator

          You can follow these docs for more information:-
          https://reactnavigation.org/docs/bottom-tab-navigator/

          1. Install the follwing package:-

            ```bash
            npm install @react-navigation/bottom-tabs
            ```

        2. Stack Navigator
        
           You can follow these docs for more information:-
           https://reactnavigation.org/docs/stack-navigator/

           1. Install the following packages:-

            ```bash
            npm install @react-navigation/stack
            npm install react-native-gesture-handler
            npm install @react-native-masked-view/masked-view
            ```




