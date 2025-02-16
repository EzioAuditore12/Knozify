import Config from "react-native-config";
import axios from "axios";

const API_URL = Config.API_BASE_URL;

export const getUserPosts = async (user_id) => {
    console.log('In get User Posts', user_id);
    try {
        if (!user_id) {
            console.log("Please enter all the fields");
            throw new Error("All fields are required to get the user posts");
        }

        const result = await axios.post(`${API_URL}/api/stream/get/posts/`, {
   
                uploader_id: user_id
          
        });
        
        console.log("User posts fetched successfully");
        console.log(result.data.posts); // Access posts from result.data
        return result.data.posts; // Return the correct data
        
    } catch (err) {
        console.error('User posts fetching error details:', {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message
        });
        throw err;
    }
};