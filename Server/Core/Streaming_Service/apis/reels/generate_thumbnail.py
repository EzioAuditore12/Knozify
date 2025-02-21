import cv2
import tempfile
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO
import os


def generate_thumbnail(video_file):
    """
    Generates thumbnail from video file at 3-second mark\n
    Returns Django's InMemoryUploadedFile object containing the thumbnail
    """
    # Create temporary file to store video
    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_video:
        for chunk in video_file.chunks():
            temp_video.write(chunk)
        temp_video_path = temp_video.name

    try:
        cap = cv2.VideoCapture(temp_video_path)
        
        # Get video properties
        fps = cap.get(cv2.CAP_PROP_FPS)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        # Calculate frame number for 3-second mark
        frame_number = min(int(3 * fps), total_frames - 1)
        
        # Set frame position to 3-second mark
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_number)
        
        # Read frame at 3-second position
        success, frame = cap.read()
        if not success:
            # If 3-second frame fails, try first frame as fallback
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            success, frame = cap.read()
            if not success:
                raise Exception("Could not read video file")

        # Convert frame to jpg image
        _, buffer = cv2.imencode('.jpg', frame)
        
        # Create file-like object
        thumb_io = BytesIO(buffer.tobytes())
        
        # Create Django-style file object
        thumbnail = InMemoryUploadedFile(
            thumb_io,
            None,
            'thumbnail.jpg',
            'image/jpeg',
            thumb_io.getbuffer().nbytes,
            None
        )

        # Clean up
        cap.release()
        os.unlink(temp_video_path)

        return thumbnail

    except Exception as e:
        if os.path.exists(temp_video_path):
            os.unlink(temp_video_path)
        raise Exception(f"Thumbnail generation failed: {str(e)}")
    