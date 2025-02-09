import Config from 'react-native-config'
import axios from 'axios'

const API_URL = Config.API_BASE_URL

export const sendOTP= async(user_name,phone_no,email)=>{
    try{
        if(!user_name && !phone_no && !email){
            console.log("Please enter all the fields")
            throw new Error("All fields are not entered to send the otp")   
        }
        const result= await axios.post(`${API_URL}/api/user/sendOTP/`,{
            user_name,
            phone_no,
            email
        }
        )
        console.log("OTP sent successfully")
        return result.data
    }catch(err){
        console.error('Phone number verification error details:', {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message
        });
    }
}

export const registerUser=async(user_name,password,phone_no,email,profile_picture='',otp)=>{
    try{
        if(!user_name && !password && !phone_no && !email && !otp){
            console.log("Please enter all the fields")
            throw new Error("All fields are not entered to register the user")   
        }
        const result=await axios.post(`${API_URL}/api/user/verifyAndReg/`,{
            user_name,
            password,
            phone_no,
            email,
            profile_picture,
            otp
        })
        console.log("User registered successfully")
        return result.data
    }catch(err){
        console.error('User registration error details:', {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message
        });
    }
}

