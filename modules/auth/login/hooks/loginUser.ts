import axios from "axios";
import { jwtDecode } from "jwt-decode";

//store
import { authStore } from "@/store";

//loginApi
import { loginAPI } from "../services/loginApi";


export async function LoginUser(username:string,password:string){
    try {      
            const authroizationTokens=await loginAPI({username,password})
            console.log(authroizationTokens)
            const decodedToken = jwtDecode<{ user_id: string }>(authroizationTokens.access);

            authStore.setState({
              authTokens:authroizationTokens,
              user:decodedToken
            })
            
            return { success: true };
          } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'Something went wrong!';
            
            if (axios.isAxiosError(error) && error.response) {
              errorMessage = error.response.data?.detail || errorMessage;
            }
            
            return { 
              success: false,
              message: errorMessage
            };
          }
}