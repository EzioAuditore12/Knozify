import Config from "react-native-config";
import axios from "axios";

const API_URL = Config.API_BASE_URL;

export const getUserDetails = async (userId) => {
    console.log("API_URL:", Config.API_URL);
    console.log("UserId:", userId);
    try {
        const response = await axios.post(`${API_URL}/api/profile/access/`, {
            _id: userId
        });
        return response.data;
    } catch (error) {
        console.error('Profile loading error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        throw error; 
    }
}