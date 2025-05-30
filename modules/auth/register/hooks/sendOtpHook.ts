import { sendOTPApi, type sendOTPApiPros } from "../services/sendOTP";
import { router } from "expo-router";
import axios from "axios";

export async function handleSendingOTP ({ phone_no }: sendOTPApiPros){
    try {
      const response = await sendOTPApi({ phone_no });
      router.push("/(auth)/register/step2")
      return { status: true, timeLeft: response.time_left_seconds };
    } catch (error) {
      console.log("Send OTP error", error);
      let errorMessage = 'Something went wrong!';
      
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.detail || errorMessage;
      }
      
      return { 
        status: false,
        message: errorMessage
      };
    }
  };

