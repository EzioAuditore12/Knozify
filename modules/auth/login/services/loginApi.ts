import axios from "axios";

const API_URL=process.env.EXPO_PUBLIC_API_URL

type loginApiProps={
    username:string,
    password:string
}

export async function loginAPI({username,password}:loginApiProps){
    try{
    const response = await axios.post(`${API_URL}/account/api/v1/token/`, {
        username,
        password,
    });
    console.log(response.data)
    return response.data

    }catch(error){
        console.log(error)
        throw error;
    }
}