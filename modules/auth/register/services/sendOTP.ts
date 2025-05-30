import axios from "axios";

const API_URL=process.env.EXPO_PUBLIC_API_URL

export type sendOTPApiPros={
    phone_no:string
}

export interface sendOTPApiResponse{
    status: "success" | "faliure"
    time_left_seconds: number
}

export const sendOTPApi=async({phone_no}: sendOTPApiPros):Promise<sendOTPApiResponse>=>{
    console.log(phone_no)
    try{
        const response=await axios.post(`${API_URL}/account/api/v1/otp/send/`,{
            phone_no
        })
        return response.data   
    }
    catch(error){
        console.log(error)
        throw error;
    }
}
