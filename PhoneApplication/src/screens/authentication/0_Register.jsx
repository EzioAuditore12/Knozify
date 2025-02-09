import React,{useState} from 'react'
import { ScrollView } from 'react-native-gesture-handler'

//components
import RegisterBackground from '../../components/0_Register/0_registerBackground'
import RegisterMainForm from '../../components/0_Register/1_registerMainForm'
import VerificationOTP from '../../components/0_Register/2_verificationOTP'

//Authentication
import {useDispatch,useSelector} from 'react-redux'
import { registerUserAction,verifyOTPuser } from '../../features/user'


const Register = () => {
  const [OtpSent, setOtpSent] = useState(false)
  const [gottenOTP, setGottenOTP] = useState('')
  // New state to hold registration details
  const [registrationDetails, setRegistrationDetails] = useState(null)
  const [isRegisterring, setIsRegistering] = useState(false)

  const dispatch = useDispatch()
  const { isAuthLoading, error } = useSelector((state) => state.auth);
  
  const handleOTPverification = async (otp) => {
    setOtpSent(false)
    setGottenOTP(otp)
    if (registrationDetails) {
      await handleRegisteration(
        registrationDetails.user_name,
        registrationDetails.password,
        registrationDetails.phone_no,
        registrationDetails.email,
        otp
      )
    }
    return otp
  }

  const handleMainRegisteration = async (user_name, password, phone_no, email) => {
    
    console.log('Here are details in main screen', email, phone_no, user_name, password)
    dispatch(verifyOTPuser({user_name,phone_no,email}))
    setRegistrationDetails({ user_name, password,phone_no,email})
    setOtpSent(true)
  }

  const handleRegisteration = async (user_name, password, phone_no, email, otp) => {
    console.log("Details in handle are", email, phone_no, user_name, password, otp)
    setIsRegistering(true)

    try{
      dispatch(registerUserAction({ email, phone_no, user_name, password, otp }))
    }catch(err){
      console.error('Error registering user:', err.message)
      setIsRegistering(false)
    }
  } 


  return (
    <ScrollView>
      <RegisterBackground/>
      {!OtpSent && <RegisterMainForm onSubmit={handleMainRegisteration}/>}
      {OtpSent && <VerificationOTP onSubmitOTP={handleOTPverification}/>}
    </ScrollView>
  )
}

export default Register