import Config from "react-native-config";
import axios from "axios";

const API_URL = Config.API_BASE_URL;

const uploadPost = async (uploader_id, title, description, image, video) => {
    try {
        const formData = new FormData();
        formData.append('uploader_id', uploader_id);
        formData.append('title', title);
        formData.append('description', description);

        // Only append video if it exists
        if (video) {
            formData.append('video', {
                uri: video.uri,
                type: video.type,
                name: video.name || 'video.mp4'
            });
        }

        // Only append image if it exists
        if (image) {
            formData.append('image', {
                uri: image.uri,
                type: image.type,
                name: image.name || 'image.jpg'
            });
        }

        const response = await axios.post(`${API_URL}/api/stream/upload/post/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default uploadPost;
