import { View, Text, ScrollView, TextInput, Button, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { pick, types } from '@react-native-documents/picker'
import { useNavigation } from '@react-navigation/native'

const UploadPost = ({}) => {
  const [fileData, setFileData] = useState([])

  const handlePick = async () => {
    try {
      const response = await pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: false,
        type: [types.images, types.video]
      })
      console.log(response)
      setFileData(response)
    } catch (err) {
      console.log(err)
    }
  }

  const handleRemoveFile = (index) => {
    const newFiles = [...fileData]
    newFiles.splice(index, 1)
    setFileData(newFiles)
  }

  const isVideo = (file) => {
    return file.type?.toLowerCase().includes('video') ||
      file.uri?.toLowerCase().includes('.mp4') ||
      file.uri?.toLowerCase().includes('.mov')
  };

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
      <View className='p-2 flex-1 mb-[200px]'>
        <Text className='text-black font-bold text-2xl mb-[20px]'>Upload Post</Text>
        <View className='flex-row gap-x-1'>
          <Image source={{
            uri: 'https://res.cloudinary.com/dpcloud123/image/upload/v1737164154/avmrjdkmjr116rxu5uis.jpg'
          }}
          className='w-[60px] h-[60px] rounded-full'
          />
          <View className='flex-col'>
            <Text className='text-black font-bold'>Daksh</Text>
            <Text className='text-gray-400'>Public</Text>
          </View>
        </View>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ post_title: '', post_content: '', post_video: '', post_photo: '' }}
          onSubmit={(values) => {
            console.log(values)
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
              <View className='p-2 flex-1 flex-col gap-y-4'>
                <TextInput
                  className='border-2 rounded-lg'
                  placeholder='Post Title'
                  placeholderTextColor='gray'
                  name="post_title"
                  onChangeText={handleChange('post_title')}
                  onBlur={handleBlur('post_title')}
                  value={values.post_title}
                />
                {errors.post_title && touched.post_title && <Text>{errors.post_title}</Text>}

                <TextInput
                  className='border-2 rounded-lg min-h-[90%]'
                  name="post_content"
                  textAlignVertical='top'
                  placeholder='Post Content'
                  placeholderTextColor='gray'
                  onChangeText={handleChange('post_content')}
                  onBlur={handleBlur('post_content')}
                  value={values.post_content}
                  multiline={true}
                />
                {/* File Picker Section placed at the bottom */}
              <View className='mt-4'>
                <Button title="Select File" onPress={handlePick} />
                {fileData.length > 0 && (
                  <View className='mt-4'>
                    <Text className='font-bold mb-2'>Selected Files:</Text>
                    {fileData.map((file, index) => (
                      <View key={index} className='flex-row items-center mb-2'>
                        {!isVideo(file) ? (
                          <Image source={{ uri: file.uri }} style={{ width: 60, height: 60, borderRadius: 4 }} />
                        ) : (
                          <View style={{ width: 60, height: 60, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Video</Text>
                          </View>
                        )}
                        <Text className='ml-2 flex-1' numberOfLines={1}>{file.uri}</Text>
                        <TouchableOpacity onPress={() => handleRemoveFile(index)}>
                          <Text style={{ color: 'red', marginLeft: 8 }}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>
                {errors.post_content && touched.post_content && <Text>{errors.post_content}</Text>}
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