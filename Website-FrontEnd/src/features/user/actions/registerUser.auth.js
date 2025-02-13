import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendOTP,registerUser} from "../../../api/authentication/registerUser.api";
import {validateAccessToken} from "../../../api/authentication/validateAccessToken.api";

export const verifyOTPuser=createAsyncThunk(
    'auth/verifyOTP',
    async({user_name,phone_no,email})=>{
        const result=await sendOTP(user_name,phone_no,email)
        console.log("Result of phone verification",result)
        if(result.error){
            console.log("Unbable to do verification of otp")
            throw new Error(result.error)
        }
        return result
    }
)

export const registerUserAction=createAsyncThunk(
    'auth/register',
    async({user_name,password,phone_no,email,otp})=>{      
        const result=await registerUser(user_name,password,phone_no,email,otp)
        if(result.error){
            console.log("Unable to do register user")
            throw new Error(result.error)
        }
        await validateAccessToken(result.tokens.access)
        localStorage.setItem('token', result.tokens.access);
        localStorage.setItem('refreshToken',result.tokens.refresh)
        localStorage.setItem('userData', JSON.stringify(result.user));
        return { token: result.tokens.access, user: result.user };
    }
)
