import { registerAPI,type registerAPIProps } from "../services/finalRegister";
import { Redirect, router } from "expo-router";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { authStore } from "@/store";

export async function finalizeRegisteration({username,password,first_name,last_name,contact}:registerAPIProps){
    try{    
    const response=await registerAPI({username,password,first_name,last_name,contact})
            const authroizationTokens=response.tokens
            console.log(authroizationTokens)
            const decodedToken = jwtDecode<{ user_id: string }>(authroizationTokens.access);
            
            authStore.setState({
            authTokens:authroizationTokens,
            user:decodedToken
            })

            router.replace("/(app)/(tabs)")
            
            return { status: true, message: typeof response.reason === 'string' ? response.reason : undefined }
    }catch(error){
        console.log("Unable to assign username",error)
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