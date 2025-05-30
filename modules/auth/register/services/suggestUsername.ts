import axios from "axios";

const API_URL=process.env.EXPO_PUBLIC_API_URL

export type suggestUsernameProps={
    first_name:string,
    last_name:string,
    birth_date:string
}

export interface SuggestedUsernameResponse{
    suggested_user_name:string
}

export const suggestUsernameAPI=async({first_name,last_name,birth_date}:suggestUsernameProps):Promise<SuggestedUsernameResponse>=>{
    try{
        const response=await axios.post(`${API_URL}/account/api/v1/username/suggest/`,{
            first_name,
            last_name,
            birth_date
        })
        return response.data
    }catch(error){
        console.log(error)
        throw error;
    }
}