import axios from "axios";

const API_URL=process.env.EXPO_PUBLIC_API_URL

export type checkUsernameProps={
    username:string
}

export interface checkUsernameResponse{
    available_to_use:boolean
}

export const checkUsernameAPI=async({username}:checkUsernameProps):Promise<checkUsernameResponse>=>{
    console.log(username)
    try{
       const response= await axios.post(`${API_URL}/account/api/v1/username/check/`,{
        username
       }) 
       return response.data
    }catch(error){
        console.log(error)
        throw error
    }
}