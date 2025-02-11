import Config from "react-native-config";
import axios from "axios";

const API_URL = Config.API_BASE_URL;

const validateAccessToken = async (access_token) => {
    try {
        if (!access_token) {
            console.log("Unable to recieve access token")
            throw new Error("Access token not recieved")
        }
        const result = await axios.get(`${API_URL}/api/user/access/`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        });
        return result.data; // Return the response data
    } catch(err) {
        console.error('Access token validation error details:', {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message
        });
        // Optionally rethrow or return a value to indicate failure
        return null;
    }
}


const generateRefreshToken = async (refresh) => {   
    try {
        if (!refresh) {
            console.log("Unable to fetch refresh token")
            throw new Error("Refresh token not received")
        }

        const response = await axios.post(`${API_URL}/api/user/refresh/`, 
            { 
                refresh 
            }, 
        );

        if (response.data && response.data['new-access']) {
            console.log('New access token:', response.data['new-access']);
            return response.data;
        } else {
            throw new Error('No access token in response');
        }
    } catch (err) {
        console.error('Refresh token error:', {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message
        });
        throw err; // Re-throw to handle it in the calling code
    }
}

export  {validateAccessToken,generateRefreshToken}