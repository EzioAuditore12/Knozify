import { validateOTP, type validateOTPProps } from "../services/validateOTP";
import {router} from "expo-router"
import axios from "axios";

export async function validateOTPHandler({phone_no, otp}: validateOTPProps): Promise<{
  status: boolean;
  message?: string;
}> {
    try {    
        const response = await validateOTP({phone_no, otp});
        if (response.status === "success") {
            router.push("/(auth)/register/step3")
            return {status: true, message: "OTP validated successfully"};
        } else {
            // If API returns error status
            return {status: false, message: "Invalid OTP"};
        }
    } catch(error) {
        console.log("Unable to validate", error);
        let errorMessage = 'Something went wrong!';
            
        if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data?.detail || errorMessage;
        }
            
        return { 
            status: false,
            message: errorMessage
        };
    }
}