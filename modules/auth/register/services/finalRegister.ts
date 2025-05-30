import axios from "axios";

const API_URL=process.env.EXPO_PUBLIC_API_URL

export type registerAPIProps={
    username:string,
    password:string,
    first_name:string,
    last_name:string,
    contact:string
}

interface registerAPIResponse{
    status:"success" | "error"
    reason:string | {username:string}
    tokens:{
        access:string
        refresh:string
    }
}

export const registerAPI=async({username,password,first_name,last_name,contact}:registerAPIProps):Promise<registerAPIResponse>=>{
    try{
        const response= await axios.post(`${API_URL}/account/api/v1/register/`,{
            username,
            password,
            first_name,
            last_name,
            contact
        })
        console.log(response)
        return response.data
    }catch(error){
        console.log(error)
        throw error;
    }
}