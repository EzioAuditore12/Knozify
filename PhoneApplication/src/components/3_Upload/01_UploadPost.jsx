import { View, Text, ScrollView, TextInput, Button, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { pick, types } from '@react-native-documents/picker'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import uploadPost from '../../api/Upload/upload.post'

const UploadPost = ({}) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
 
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
    post_title: yup.string().required('Post Title is Required'),
    post_content: yup.string().required('Post Content is Required'),
  })

  // Loading Overlay Component
  const LoadingOverlay = () => (
    isLoading && (
      <View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <ActivityIndicator size="large" color="#9AE6C6" />
        <Text style={{ color: 'white', marginTop: 10 }}>Uploading post...</Text>
      </View>
    )
  )

  return (
    <ScrollView 
      className="bg-white flex-1"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <LoadingOverlay />
      <View className="p-4 flex-1 pb-20"> {/* Added pb-20 for bottom padding */}
        {error && (
          <Text className="text-red-500 mb-4 p-3 bg-red-100 rounded-lg">
            {error}
          </Text>
        )}
        {successMsg && (
          <Text className="text-green-700 mb-4 p-3 bg-green-100 rounded-lg">
            {successMsg}
          </Text>
        )}
        <Text className="text-black font-bold text-2xl mb-6">Upload Post</Text>
        
        {/* User Info Section */}
        <View className="flex-row items-center space-x-3 mb-6">
          <Image
            source={{ uri: user.profile_picture }}
            className="w-[60px] h-[60px] rounded-full border-2 border-gray-200"
          />
          <View className="flex-col">
            <Text className="text-black font-bold text-lg">{user.user_name}</Text>
            <Text className="text-gray-500">Public</Text>
          </View>
        </View>

        <Formik
          validationSchema={validationSchema}
          initialValues={{ post_title: '', post_content: '' }}
          onSubmit={async (values) => {
            try {
              setIsLoading(true)
              setError(null)
              setSuccessMsg(null)
              
              await uploadPost(
                user._id,
                values.post_title,
                values.post_content,
                selectedImage,
                selectedVideo
              )

              // Reset form and states after successful upload
              setSelectedImage(null)
              setSelectedVideo(null)
              values.post_title = ''
              values.post_content = ''
              
              setSuccessMsg('Post uploaded successfully! 🎉')
              
              // Auto-hide success message after 3 seconds
              setTimeout(() => {
                setSuccessMsg(null)
              }, 3000)
              
            } catch (err) {
              setError(err.message || 'Failed to upload post')
            } finally {
              setIsLoading(false)
            }
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
            <View className="space-y-4">
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-gray-50 text-black"
                placeholder="Post Title"
                placeholderTextColor="gray"
                name="post_title"
                onChangeText={handleChange('post_title')}
                onBlur={handleBlur('post_title')}
                value={values.post_title}
              />
              {errors.post_title && touched.post_title && (
                <Text className="text-red-500 text-sm">{errors.post_title}</Text>
              )}

              {/* Media Options Section */}
              <View className="flex-row justify-start gap-x-3 py-4 bg-white rounded-lg">
                {(!selectedImage && !selectedVideo) ? (
                  <>
                    <TouchableOpacity 
                      onPress={handlePickImage}
                      className="items-center space-y-2"
                    >
                      <Icon name="image" size={32} color="#4B5563" />
                      <Text className="text-gray-600">Add Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={handlePickVideo}
                      className="items-center space-y-2"
                    >
                      <Icon name="videocam" size={32} color="#4B5563" />
                      <Text className="text-gray-600">Add Video</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View className="flex-row items-center justify-center w-full">
                    {selectedImage && (
                      <View className="flex-row items-center bg-gray-100 p-2 rounded-lg">
                        <Image 
                          source={{ uri: selectedImage.uri }} 
                          className="w-[80px] h-[80px] rounded-lg"
                        />
                        <TouchableOpacity 
                          onPress={() => setSelectedImage(null)}
                          className="ml-2 p-2"
                        >
                          <Icon name="close" size={24} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    )}
                    {selectedVideo && (
                      <View className="flex-row items-center bg-gray-100 p-2 rounded-lg">
                        <View className="w-[80px] h-[80px] bg-gray-200 rounded-lg justify-center items-center">
                          <Icon name="videocam" size={32} color="#4B5563" />
                        </View>
                        <TouchableOpacity 
                          onPress={() => setSelectedVideo(null)}
                          className="ml-2 p-2"
                        >
                          <Icon name="close" size={24} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
              </View>

              <TextInput
                className="border border-gray-300 rounded-lg p-3 min-h-[230px] bg-gray-50 text-black"
                name="post_content"
                textAlignVertical="top"
                placeholder="Write your post content here..."
                placeholderTextColor="gray"
                onChangeText={handleChange('post_content')}
                onBlur={handleBlur('post_content')}
                value={values.post_content}
                multiline={true}
              />
              {errors.post_content && touched.post_content && (
                <Text className="text-red-500 text-sm">{errors.post_content}</Text>
              )}

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isValid || isLoading}
                className={`py-3 px-6 rounded-lg ${
                  !isValid || isLoading 
                    ? 'bg-gray-300' 
                    : 'bg-blue-500'
                } mt-6`}
              >
                <Text className={`text-center font-bold ${
                  !isValid || isLoading 
                    ? 'text-gray-500' 
                    : 'text-white'
                }` }>
                  {isLoading ? 'Uploading...' : 'Submit Post'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  )
}

export default UploadPost