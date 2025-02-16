import Config from "react-native-config";
import axios from "axios";

const API_URL = Config.API_BASE_URL;

const uploadPost = async (uploader_id, title, description, video) => {
    try {
        const formData = new FormData();
        formData.append('uploader_id', uploader_id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video', {
          uri: video.uri,
          type: video.type,
          name: video.name || 'video.mp4'
        });
        const response = await axios.post(`${API_URL}/api/upload/post/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default uploadPost;
