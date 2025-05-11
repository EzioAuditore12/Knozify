import axios from "axios";
import { authStore } from "@/store";
import { jwtDecode } from "jwt-decode";

const API_URL=process.env.EXPO_PUBLIC_API_URL


export async function LoginUser(username:string,password:string){
    try {
            const {authTokens,user}=authStore.getState()
            const response = await axios.post(`${API_URL}/account/api/v1/token/`, {
              username,
              password,
            });
            
            const authroizationTokens = response.data;
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