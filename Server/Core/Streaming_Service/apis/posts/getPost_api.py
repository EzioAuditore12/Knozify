from rest_framework import status
from rest_framework.response import Response
from bson import ObjectId
from django.forms.models import model_to_dict


from Authentication_Service.models import UserDetails
from Streaming_Service.models import Posts
from .utils import get_time_ago


def get_posts(requests):
    try:
        uploader_id = ObjectId(requests.data.get("uploader_id"))

        user = UserDetails.objects.get(_id=uploader_id)
        if not user:
            return Response({
                'status': 'error',
                'message': f"User of this Uploader_id not found, {uploader_id}",
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Get all posts for the user
        posts = Posts.objects.filter(uploader=user).values(
            'title',
            'description',
            'likes',
            'shares',
            'upload_time',
            'post_type',
            'image_link',
            'video_link',
            'thumbnail_link'
        )

        # Convert posts queryset to list and add user details
        response_data = []
        for post in posts:
            post_data = {
                **post,
                'post_uploaded_ago': get_time_ago(post['upload_time']),
                'uploader_details': {
                    'user_name': user.user_name,
                    'profile_picture': user.profile_picture
                }
            }
            response_data.append(post_data)

        return Response({
            'status': 'success',
            'posts': response_data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'status': 'exception',
            'message': f"Exception: {e}",
        }, status=status.HTTP_400_BAD_REQUEST)