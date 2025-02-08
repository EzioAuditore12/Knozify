#!/bin/bash

# Check if an app name is provided
if [ -z "$1" ]; then
  echo "Usage: source $0 <appName>"
  return 1
fi

# Assign the first argument to the appName variable
appName=$1

# Initialize the React Native app
npx @react-native-community/cli init "$appName"

# Change directory to the app
cd "$appName" || return

# Confirmation message
echo "React Native app '$appName' created and switched to its directory."

#Reinstalling the node packages
echo "Reinstalling the node packages..."
npm install

# Install the required packages
echo "Installing required npm packages..."
npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context

# Initialize Tailwind CSS
echo "Initializing Tailwind CSS..."
npx tailwindcss init

# Update the Tailwind CSS configuration file
echo "Configuring Tailwind CSS..."
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

# Create a global CSS file
echo "Creating a global CSS file..."
echo "@tailwind base;" > global.css
echo "@tailwind components;" >> global.css
echo "@tailwind utilities;" >> global.css

# Update babel.config.js
echo "Updating babel.config.js..."
cat > babel.config.js <<EOL
module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
};
EOL

# Update metro.config.js
echo "Updating metro.config.js..."
cat > metro.config.js <<EOL
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = mergeConfig(getDefaultConfig(__dirname), {
/* your config */
});

module.exports = withNativeWind(config, { input: "./global.css" });
EOL

# Update App.tst
echo "Updating App.tsx..."
cat > App.tsx <<EOL
import { View, Text } from 'react-native'
import React from 'react'
import "./global.css"

const App = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-3xl text-center'>App initialized with nativeWind</Text>
    </View>
  )
}

export default App
EOL

#Creating nativewind env
echo "Creating nativewind env..."
echo "/// <reference types=\"nativewind/types\" />" > nativewind-env.d.ts

#Running the app
echo "Running the app..."
npx react-native run-android

# Final confirmation
echo "Setup complete! React Native app '$appName' is ready with NativeWind and Tailwind CSS configured."
