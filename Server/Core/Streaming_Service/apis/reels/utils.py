import cv2
import ffmpeg
import numpy as np
import tempfile
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO
import os


def convert_to_mp4(video_file):
    """
    Converts video to MP4 format if it's not already MP4
    Returns Django's InMemoryUploadedFile object containing the MP4 video
    """
    # Get file extension from content type or filename
    content_type = video_file.content_type
    original_name = video_file.name
    file_ext = original_name.split(".")[-1]

    # If already MP4, return original file
    if content_type == 'video/mp4' or file_ext == 'mp4':
        video_file.seek(0)
        return video_file

    # Create temporary files for input and output
    with tempfile.NamedTemporaryFile(delete=False, suffix=file_ext) as temp_input:
        for chunk in video_file.chunks():
            temp_input.write(chunk)
        input_path = temp_input.name

    output_path = input_path + '_converted.mp4'

    try:
        # Convert video to MP4 using ffmpeg
        stream = ffmpeg.input(input_path)
        stream = ffmpeg.output(stream, output_path, vcodec='h264', acodec='aac')
        ffmpeg.run(stream, overwrite_output=True, quiet=True)

        # Read converted file and create InMemoryUploadedFile
        with open(output_path, 'rb') as converted_file:
            file_content = converted_file.read()
            
        converted_io = BytesIO(file_content)
        converted_video = InMemoryUploadedFile(
            converted_io,
            'video',
            os.path.splitext(original_name)[0] + '.mp4',
            'video/mp4',
            converted_io.getbuffer().nbytes,
            None
        )

        return converted_video

    except Exception as e:
        raise Exception(f"Video conversion failed: {str(e)}")
    
    finally:
        # Clean up temporary files
        if os.path.exists(input_path):
            os.unlink(input_path)
        if os.path.exists(output_path):
            os.unlink(output_path)


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