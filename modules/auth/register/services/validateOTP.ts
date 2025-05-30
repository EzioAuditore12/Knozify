import axios from "axios";

const API_URL=process.env.EXPO_PUBLIC_API_URL

export type validateOTPProps={
    phone_no:string,
    otp:string
}

export interface validateOTPResponse{
    status:"success" | "error"
}

export const validateOTP=async({phone_no,otp}:validateOTPProps):Promise<validateOTPResponse>=>{
    try{
        const response = await axios.post(`${API_URL}/account/api/v1/otp/validate/`,{
            phone_no,
            otp
        })
        return response.data
    }
    catch(error){
        console.log(error)
        throw error;
    }
}