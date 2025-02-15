from rest_framework import status
from rest_framework.response import Response
from bson import ObjectId
from rest_framework import serializers

from Authentication_Service.models import UserDetails
from Streaming_Service.models import Reels


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
        

        video_links = Reels.objects.filter(
            uploader = user
        ).values_list('video_link', flat=True)

        

        return Response({
            'status':'success',
            'links': video_links,
        }, status=status.HTTP_200_OK)


    
    except Exception as e:
        return Response({
            'status':'exception',
            'message':f'Exception: {e}',
        }, status=status.HTTP_400_BAD_REQUEST)