import { View, Text ,TextInput,TouchableOpacity} from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native'


const RegisterMainForm = () => {
    const navigation = useNavigation()
    const validationSchema = yup.object().shape({
        //email
        email: yup
         .string()
         .min(5, ({ min }) => `Email must be at least ${min} characters`)
         .required('Email Address is Required'),
         //phone number
         phone_number: yup
         .string()
         .min(10, ({ min }) => `Phone Number must be at least ${min} characters`)
         .required('Phone Number is Required'),
         //user name
         user_name: yup
         .string()
          .min(5, ({ min }) => `User Name must be at least ${min} characters`)          
         .required('User Name is Required'),
         //password
         password: yup
         .string()
         .min(8, ({ min }) => `Password must be at least ${min} characters`)
         .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
         .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
         .matches(/[0-9]/, 'Password must contain at least one number')
         .required('Password is required'),
    })

    const handleSubmit = async (values) => {
        try {
            // Add your API call here
            console.log('Form values:', values)
            // Navigate to next screen or show success message
        } catch (error) {
            console.error('Registration error:', error)
        }
    }
    

  return (
        <Formik
            validationSchema={validationSchema}
            initialValues={{ email: '' }}
            onSubmit={handleSubmit}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
            }) => (
       <View className='bg-slate-100 flex-1'>
       <Text className='text-xl text-center mt-[20px] font-bold text-gray-600'>Create your account</Text>
       <View className='mt-[20px] flex-1 bg-white rounded-3xl mx-2 elevation-5 shadow-2xl'>
       <Text className='text-lg mx-4 mt-4 font-semibold text-gray-700'>Email</Text>
           <TextInput
               className='px-4 border-gray-700 border-2 rounded-lg mx-4 mt-4 max-h-[40px] font-semibold text-black'
               name="email"
               placeholder="Email Address"
               placeholderTextColor={'#000'}
               onChangeText={handleChange('email')}
               onBlur={handleBlur('email')}
               value={values.email}
               keyboardType="email-address"
               multiline={false}
           />
           {errors.email &&
           <Text className='mx-4 font-semibold text-red-500'>{errors.email}</Text>
           }
       <Text className='text-lg mx-4 mt-4 font-semibold text-gray-700'>Phone Number</Text>
           <TextInput
               className='px-4 border-gray-700 border-2 rounded-lg mx-4 mt-4 max-h-[40px] font-semibold text-black'
               name="phone_number"
               placeholder="Phone Number"
               placeholderTextColor={'#000'}
               onChangeText={handleChange('phone_number')}
               onBlur={handleBlur('phone_number')}
               value={values.phone_number}
               keyboardType="phone-pad"
                multiline={false}
           />
           {errors.phone_number &&
           <Text className='mx-4 font-semibold text-red-500'>{errors.phone_number}</Text>
           }
       <Text className='text-lg mx-4 mt-4 font-semibold text-gray-700'>User Name</Text>
           <TextInput
               className='px-4 border-gray-700 border-2 rounded-lg mx-4 mt-4 max-h-[40px] font-semibold text-black'
               name="user_name"
               placeholder="User Name"
               placeholderTextColor={'#000'}
               onChangeText={handleChange('user_name')}
               onBlur={handleBlur('user_name')}
               value={values.user_name}
               multiline={false}
           />
           {errors.user_name &&
           <Text className='mx-4 font-semibold text-red-500'>{errors.user_name}</Text>
           }
       <Text className='text-lg mx-4 mt-4 font-semibold text-gray-700'>Password</Text>
           <TextInput
               className='px-4 border-gray-700 border-2 rounded-lg mx-4 mt-4 max-h-[40px] font-semibold text-black'
               name="password"
               placeholder="Password"
               placeholderTextColor={'#000'}
               onChangeText={handleChange('password')}
               onBlur={handleBlur('password')}
               value={values.password}
               secureTextEntry
                multiline={false}
           />
           {errors.password &&
           <Text className='mx-4 font-semibold text-red-500'>{errors.password}</Text>
           }
       <TouchableOpacity 
       className='bg-[#28A361] mx-4 mt-4 rounded-lg h-[50px] flex-row justify-center items-center'
       onPress={handleSubmit}
       disabled={!isValid}
       >
       <Text className='text-white font-semibold text-xl'>Register</Text>
       </TouchableOpacity>
        <View className='flex-row justify-center mt-4 mb-[20px] gap-x-1'>
           <Text className='text-gray-700'>Already have an account?</Text>
           <Text 
           className='text-green-600 font-semibold' 
           onPress={() => {
               navigation.pop()
               navigation.navigate('Login')}
               }
           >
           Login
           </Text>
           </View>
       </View>
       </View>
       )}
       
    </Formik>
  )
}

export default RegisterMainForm