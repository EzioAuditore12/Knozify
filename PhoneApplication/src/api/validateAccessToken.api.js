import Config from "react-native-config";
import axios from "axios";

const API_URL = Config.API_BASE_URL;

const validateAccessToken= async(access_token)=>{
    try{
        if(!access_token){
            console.log("Unable to recieve access token")
            throw new Error("Access token not recieved")
        }
        const result=await axios.get(`${API_URL}/api/user/access`,{
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        })
    }catch(err){
        console.error('Access token validation error details:', {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message
        });
    }
}

export default validateAccessToken