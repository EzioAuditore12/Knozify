import boto3
from bson import ObjectId
from rest_framework import status
from rest_framework.response import Response

from Authentication_Service.models import UserDetails
from Streaming_Service.models import Reels
from .s3_uploader import upload_to_S3

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

        # Now for uploading video (Reel)
        video = request.FILES.get("video")

        if not video:
            return Response({
                'status':'error',
                'message' :'No video found in request!! (video khaa ha? bhai)'
            }, status=status.HTTP_404_NOT_FOUND)
        
        uploaded = upload_to_S3(
            video_file=video
        )

        if uploaded[0] is None:
            return Response({
                'status' : 'error',
                'message' : f'Error: {uploaded[1]}'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # uploaded[0] has Video URL if everything goes right
        media = Reels(
            uploader=user,
            title=title,
             description=description,
            video_link=uploaded[0]
        )

        media.save()
        return Response({
            'status':'sucess',
            'message' : f'video {video.name} has been uploaded successfully',
            'path': f'{uploaded[0]}',
            'uploader': f'{user.user_name}'
        }, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({
            'status':'exception',
            'message' : f"Exception: {e}",
        }, status=status.HTTP_400_BAD_REQUEST)
