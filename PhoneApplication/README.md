

## Installation and Setup

You can follow and install the required packages with

 For more detail you can look in dependencies and dev dependecies in package.json

```
npm install
```

### Manual Setup

1. NativeWind 

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
    
    3. Create a global css file

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

    3. Update the babel.config.js
        
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
       


