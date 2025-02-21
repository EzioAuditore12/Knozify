import ffmpeg
import tempfile
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO
import os


def convert_to_mp4(video_file):
    """
    Converts video to MP4 format with H.264 codec and handles high FPS videos (up to 120fps)
    Returns Django's InMemoryUploadedFile object containing the MP4 video
    """
    content_type = video_file.content_type
    original_name = video_file.name
    file_ext = original_name.split(".")[-1]

    # If already MP4, still process to ensure compatibility
    with tempfile.NamedTemporaryFile(delete=False, suffix=file_ext) as temp_input:
        for chunk in video_file.chunks():
            temp_input.write(chunk)
        input_path = temp_input.name

    output_path = input_path + '_converted.mp4'

    try:
        # Get input video info
        probe = ffmpeg.probe(input_path)
        video_info = next(s for s in probe['streams'] if s['codec_type'] == 'video')
        
        # Calculate target FPS based on input
        input_fps = float(eval(video_info.get('r_frame_rate', '30/1')))
        
        # Define FPS targets based on input
        if input_fps <= 30:
            target_fps = input_fps  # Keep original if 30 or below
        elif input_fps <= 60:
            target_fps = 30  # Convert to 30fps if between 31-60
        else:
            target_fps = 60  # Cap at 60fps for very high FPS videos (e.g. 120fps)

        # Adjust bitrate based on FPS
        if target_fps <= 30:
            bitrate = '2M'
        else:
            bitrate = '4M'  # Higher bitrate for higher FPS

        # Convert video with specific settings
        stream = ffmpeg.input(input_path)
        stream = ffmpeg.output(
            stream, 
            output_path,
            **{
                'vcodec': 'libx264',  # Force H.264 codec
                'acodec': 'aac',      # AAC audio codec
                'video_bitrate': bitrate,  # Dynamic bitrate
                'r': str(target_fps), # Target FPS
                'pix_fmt': 'yuv420p', # Standard pixel format
                'preset': 'medium',    # Encoding preset
                'movflags': '+faststart', # Web optimized
                'profile:v': 'high',   # High profile for better quality
                'level': '4.1'        # Compatibility level
            }
        )
        ffmpeg.run(stream, overwrite_output=True, quiet=True)

        # Create Django file object
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