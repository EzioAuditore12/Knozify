import Config from "react-native-config";
import axios from "axios";

const API_URL = Config.API_BASE_URL;

const sendOtpForgottenPassword=async(phone_no)=>{
    try{
        if(!phone_no){
            throw new Error("Phone number is required");
        }
        const result = await axios.post(`${API_URL}/api/user/sendOtp/password/`,{
            phone_no
        });
        return result.data;
    }catch(err){
        console.log(err);
        throw new Error(err.response.data.message);
    }
}

const changePassword=async(phone_no,otp,password)=>{
try{
    if(!phone_no && !otp && !password){
        throw new Error("Phone number, OTP and Password is required");
    }
    const result = await axios.post(`${API_URL}/api/user/changePassword/`,{
        phone_no,
        otp,
        password
    });
    return result.data
}catch(err){
    console.log(err);
    throw new Error(err.response.data.message);
}
}

export {sendOtpForgottenPassword,changePassword}