import {ScrollView, Text, View, ImageBackground} from 'react-native'
import React from 'react'

function Box({ imageUrl, name }) {
  return (
    <View 
      className='h-[80px] w-[60px] bg-white justify-center rounded-lg'
      style={{
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
      }}
    >
      <ImageBackground
        source={{
          uri: imageUrl
        }}
        className='h-full w-full items-center justify-end'
        imageStyle={{ borderRadius: 8 }}
      >
      </ImageBackground>
    </View>
  )
}



const UserStories = ({stories}) => {
  return (
    <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="flex-row p-4"
          contentContainerStyle={{ gap: 16 }}
        >
          {stories?.map((story, index) => (
            <Box 
              key={index}
              imageUrl={story.userAvatar}
              name={story.userName}
            />
          ))}
        </ScrollView>
  )
}

export default UserStories