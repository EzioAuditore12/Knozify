import { View, Text, ActivityIndicator, StyleSheet, Pressable, Image, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, getCameraDevice } from 'react-native-vision-camera'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign'

const CameraScreen = () => {
  const [hasPermissions, setHasPermissions] = useState(false)
  const [cameraPosition, setCameraPosition] = useState('front')
  const [photoTaken, setPhotoTaken] = useState()
  const [flashOn, setFlashOn] = useState('off')
  const camera = useRef(null)
  const isFocused = useIsFocused()
  
  const devices = Camera.getAvailableCameraDevices()
  const device = getCameraDevice(devices, cameraPosition, {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera'
    ]
  })

  const requestPermissions = async () => {
    try {
      const cameraGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs camera permission to take pictures",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      const audioGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Microphone Permission",
          message: "App needs microphone permission",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      
      if (cameraGranted === PermissionsAndroid.RESULTS.GRANTED && 
          audioGranted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasPermissions(true)
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestPermissions()
  }, [])

  const uploadPhoto = async () => {
    if (!photoTaken) {
      return
    }
    const result = await fetch(`file://${photoTaken.path}`)
    const data = await result.blob()
  }

  const onTakePicturePresses = async () => {
    try {
      const photo = await camera.current.takePhoto({
        qualityProduction: 'speed',
        flash: flashOn,
      })
      setPhotoTaken(photo)
    } catch (error) {
      console.error('Failed to take photo:', error)
    }
  }

  if (!hasPermissions) {
    return <ActivityIndicator />
  }

  if (!device) {
    return <Text>No camera device available</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        device={device}
        isActive={isFocused && !photoTaken}
        style={StyleSheet.absoluteFill}
        ref={camera}
        photo={true}
      />

      {photoTaken ? (
        <>
          <Image
            source={{ uri: `file://${photoTaken.path}` }}
            style={StyleSheet.absoluteFill}
          />
          <Icon
            name='arrowleft'
            size={30}
            style={{
              position: 'absolute',
              top: 2,
              left: 10

            }}
            onPress={() => setPhotoTaken(undefined)}
          />
          <Icon
            name='upload'
            size={30}
            style={{
              position: 'absolute',
              top: 2,
              right: 10

            }}
            onPress={uploadPhoto}
          />
        </>
      ) : (
        <>
          <Pressable
            style={{
              position: 'absolute',
              bottom: 16,
              alignSelf: 'center',
              padding: 16,
              borderRadius: 100,
              backgroundColor: 'white',
              opacity: 0.5,
              height: 64,
              width: 64
            }}
            onPress={onTakePicturePresses}
          />
          <Icon
            name='sync'
            size={30}
            style={{
              position: 'absolute',
              top: 2,
              right: 10
            }}
            onPress={() => {
              // Handle flash first
              if (cameraPosition === 'back') {
                // If switching from back to front, turn flash off
                setFlashOn('off')
              }
              // Then switch camera position
              setCameraPosition(cameraPosition === 'back' ? 'front' : 'back')
            }}
          />
          <Icon
            name='bulb1'
            size={30}
            color={flashOn === 'off' ? '#ffffff' : '#ffeb3b'}
            style={{
              position: 'absolute',
              top: 50,
              right: 10
            }}
            onPress={() => setFlashOn(flashOn === 'off' ? 'on' : 'off')}
          />

        </>
      )}
    </View>
  )
}

export default CameraScreen
