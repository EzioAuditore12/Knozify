from rest_framework import status
from rest_framework.response import Response
from bson import ObjectId
from rest_framework import serializers

from Authentication_Service.models import UserDetails
from Streaming_Service.models import Reels
from Streaming_Service.apis.posts.utils import get_time_ago

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reels
        fields = ['title', 'description', 'likes', '_id', 'video_link', 'shares', 'uploader', 'upload_time', 'thumbnail_link']



def get_uploads(request):
    """
    Get all uploaded reels, (will set it to 10 uploads per request afterwards)
    """

    try:
        user_id = ObjectId(request.data.get("uploader_id"))
        
        user = UserDetails.objects.get(_id=user_id)

        if not user:
            return Response({
                'status':'error',
                'message':'Incorrect User id (user id to sahi se copy karle)',
            },status=status.HTTP_400_BAD_REQUEST)
        
        # Get all posts for the user
        reels = Reels.objects.filter(uploader=user).values(
            'title',
            'description',
            'likes',
            'shares',
            'thumbnail_link',
            'gif_link',
            'video_link',
            'upload_time',
        )
        
        # Convert posts queryset to list and add user details
        response_data = []
        for reel in reels:
            reel_data = {
                **reel,
                'reel_uploaded_ago': get_time_ago(reel['upload_time']),
                'uploader_details': {
                    'user_name': user.user_name,
                    'profile_picture': user.profile_picture
                }
            }
            response_data.append(reel_data)

        

        return Response({
            'status':'success',
            'reels': response_data,
        }, status=status.HTTP_200_OK)


    
    except Exception as e:
        return Response({
            'status':'exception',
            'message':f'Exception: {e}',
        }, status=status.HTTP_400_BAD_REQUEST)