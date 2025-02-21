import boto3
from bson import ObjectId
from rest_framework import status
from rest_framework.response import Response

from Authentication_Service.models import UserDetails
from Streaming_Service.models import Reels
from .s3_uploader import upload_to_S3
from .convert_to_mp4 import convert_to_mp4
from .generate_thumbnail import generate_thumbnail
from .generate_gif import generate_gif

def upload_reel(request):
    """
    Uploads the reel video in S3 bucket and saves the reel meta data in mongo db.
    """
    try:
        user_id = ObjectId(request.data.get("uploader_id"))
        user = UserDetails.objects.get(_id=user_id)

        if not user:
            return Response({
                'status':'error',
                'messsage' : 'User not found (user id to sahi se copy karle)',
            }, status=status.HTTP_404_NOT_FOUND)

        title = request.data.get("title")
        description = request.data.get("description")
        video = request.FILES.get("video")

        if not video:
            return Response({
                'status':'error',
                'message' :'No video found in request!! (video khaa ha? bhai)'
            }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            video = convert_to_mp4(video)
        except Exception as e:
            return Response({
                'status': 'error',
                'message': f'Error converting video: {str(e)}'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # GIF
        video.seek(0)
        try:
            gif = generate_gif(video)
            video.seek(0)
        except Exception as e:
            return Response({
                'status' : 'error',
                'message' : f'Error generating GIF: {e}',
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Upload GIF
        gif_upload = upload_to_S3(gif)
        if gif_upload[0] is None:
            return Response({
                'status': 'error',
                'message': f'Error uploading GIF: {gif_upload[1]}'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        video.seek(0)
        try:
            thumbnail = generate_thumbnail(video)
            # Reset video file pointer to beginning for next operation
            video.seek(0)
        except Exception as e:
            return Response({
                'status': 'error',
                'message': f'Error generating thumbnail: {str(e)}'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Upload video
        uploaded = upload_to_S3(video_file=video)
        if uploaded[0] is None:
            return Response({
                'status' : 'error',
                'message' : f'Error uploading video: {uploaded[1]}'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Upload thumbnail
        thumbnail_upload = upload_to_S3(video_file=thumbnail)
        if thumbnail_upload[0] is None:
            return Response({
                'status' : 'error',
                'message' : f'Error uploading thumbnail: {thumbnail_upload[1]}'
            }, status=status.HTTP_400_BAD_REQUEST)
    


        media = Reels(
            uploader=user,
            title=title,
            description=description,
            video_link=uploaded[0],
            thumbnail_link=thumbnail_upload[0],
            gif_link = gif_upload[0]
        )

        media.save()
        return Response({
            'status':'success',
            'message' : f'video {video.name} has been uploaded successfully',
            'video_path': uploaded[0],
            'thumbnail': thumbnail_upload[0],
            'uploader': user.user_name,
            'gif_link' : gif_upload[0]
        }, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({
            'status':'exception',
            'message' : f"Exception: {e}",
        }, status=status.HTTP_400_BAD_REQUEST)
