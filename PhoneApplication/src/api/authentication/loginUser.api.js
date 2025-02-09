import Config from "react-native-config";
import axios from "axios";

const API_URL = Config.API_BASE_URL;

const loginUserCheck = async(user_name, password) => {
    try {
        if(!user_name || !password){ // changed condition to OR
            console.log("Please enter all the fields")
            throw new Error("All fields are not entered to login the user")
        }
        const result = await axios.post(`${API_URL}/api/user/login/`, { user_name, password })
        console.log("User logged in successfully")
        return result.data
    } catch(err) {
        console.error('User login error details:', {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message
        });
        throw err // rethrow the error so that downstream code receives it
    }
}

export default loginUserCheck