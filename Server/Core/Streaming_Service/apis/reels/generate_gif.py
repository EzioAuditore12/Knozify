import ffmpeg
import tempfile
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO
import os

def generate_gif(video_file):
    """
    Converts a video file into an optimized GIF (first 3 seconds, 15 FPS).
    Returns an InMemoryUploadedFile object for easy upload to S3.
    """
    # Save video to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_video:
        for chunk in video_file.chunks():
            temp_video.write(chunk)
        video_path = temp_video.name

    gif_path = f"{video_path}.gif"

    try:
        # Generate GIF
        ffmpeg.input(video_path, ss=0, t=3).output(
            gif_path, 
            vf="fps=30,scale=720:-1:flags=lanczos",
            pix_fmt="rgb8"
        ).overwrite_output().run()

        # Read the generated GIF
        with open(gif_path, 'rb') as gif_file:
            gif_content = gif_file.read()

        gif_io = BytesIO(gif_content)
        gif_uploaded = InMemoryUploadedFile(
            gif_io, 'image', 'preview.gif', 'image/gif', gif_io.getbuffer().nbytes, None
        )

        return gif_uploaded

    except ffmpeg.Error as e:
        raise Exception(f"FFmpeg error: {e.stderr.decode('utf8') if e.stderr else str(e)}")
    finally:
        # Clean up temp files
        for path in [video_path, gif_path]:
            if os.path.exists(path):
                os.unlink(path)
