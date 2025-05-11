import {jwtDecode} from 'jwt-decode'
import axios from 'axios'

const API_URL=process.env.EXPO_PUBLIC_API_URL

export async function regenerateTokens(authTokens:{refresh:string,access:string} | null){

        try{
        const response= await axios.post(`${API_URL}/account/api/v1/token/refresh/`,{
            refresh:authTokens?.refresh
        })

        const updatedTokens=response.data
        const decodedUser=jwtDecode<{user_id:string}>(updatedTokens.access)

        return {
            updatedTokens,
            decodedUser
        }
    }
    catch(error){
        console.log(error)
    }
    
}