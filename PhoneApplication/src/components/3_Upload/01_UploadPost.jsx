import { View, Text, ScrollView, TextInput, Button, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { pick, types } from '@react-native-documents/picker'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const UploadPost = ({}) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
 
  const { user } = useSelector((state) => state.auth)

  const handlePickImage = async () => {
    try {
      const response = await pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: false,
        type: [types.images]
      })
      if(response && response.length > 0){
        setSelectedImage(response[0])
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handlePickVideo = async () => {
    try {
      const response = await pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: false,
        type: [types.video]
      })
      if(response && response.length > 0){
        setSelectedVideo(response[0])
      }
    } catch (err) {
      console.log(err)
    }
  }

  const validationSchema = yup.object().shape({
    // Post Title
    post_title: yup.string().required('Post Title is Required'),
    // Post Content
    post_content: yup.string().required('Post Content is Required'),
    // post_video
    post_video: yup.string(),
    // post_photo
    post_photo: yup.string()
  })

  return (
    <ScrollView>
      <View className='p-2 flex-1'>
        <Text className='text-black font-bold text-2xl mb-[20px]'>Upload Post</Text>
        <View className='flex-row gap-x-1'>
          <Image source={{
            uri: user.profile_picture
          }}
          className='w-[60px] h-[60px] rounded-full'
          />
          <View className='flex-col'>
            <Text className='text-black font-bold'>{user.user_name}</Text>
            <Text className='text-gray-400'>Public</Text>
          </View>
        </View>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ post_title: '', post_content: '', post_video: '', post_photo: '' }}
          onSubmit={(values) => {
            console.log({ ...values,
              post_photo: selectedImage ? selectedImage.uri : '',
              post_video: selectedVideo ? selectedVideo.uri : ''
            })
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid
          }) => (
            <>
              <View className='p-2 flex-col gap-y-4'>
                <TextInput
                  className='border-2 rounded-lg'
                  placeholder='Post Title'
                  placeholderTextColor='gray'
                  name="post_title"
                  onChangeText={handleChange('post_title')}
                  onBlur={handleBlur('post_title')}
                  value={values.post_title}
                />
                {errors.post_title && touched.post_title && <Text className='text-red-500'>{errors.post_title}</Text>}

                {/* Media Options Section: Only one of photo or video can be selected */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 8 }}>
                  {(!selectedImage && !selectedVideo) ? (
                    <>
                      <TouchableOpacity onPress={handlePickImage}>
                        <Icon name="image" size={30} color="#000" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handlePickVideo}>
                        <Icon name="videocam" size={30} color="#000" />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      {selectedImage && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={{ uri: selectedImage.uri }} style={{ width: 60, height: 60, borderRadius: 4 }} />
                          <TouchableOpacity onPress={() => setSelectedImage(null)}>
                            <Icon name="close" size={20} color="red" style={{ marginLeft: 8 }} />
                          </TouchableOpacity>
                        </View>
                      )}
                      {selectedVideo && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View style={{ width: 60, height: 60, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="videocam" size={30} color="#000" />
                          </View>
                          <TouchableOpacity onPress={() => setSelectedVideo(null)}>
                            <Icon name="close" size={20} color="red" style={{ marginLeft: 8 }} />
                          </TouchableOpacity>
                        </View>
                      )}
                    </>
                  )}
                </View>

                <TextInput
                  className='border-2 rounded-lg min-h-[230px]'
                  name="post_content"
                  textAlignVertical='top'
                  placeholder='Post Content'
                  placeholderTextColor='gray'
                  onChangeText={handleChange('post_content')}
                  onBlur={handleBlur('post_content')}
                  value={values.post_content}
                  multiline={true}
                />
                {errors.post_content && touched.post_content && <Text className='text-red-500'>{errors.post_content}</Text>}
                <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  )
}

export default UploadPost