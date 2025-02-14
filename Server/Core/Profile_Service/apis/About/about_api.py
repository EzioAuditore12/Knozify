from rest_framework import status
from rest_framework.response import Response
from Authentication_Service.models import UserDetails
from bson import ObjectId

from .utils import *

def about_me(request):
    """
    Returns the information required for about me, in profile page, 

    1. `user_name`: User name of user.
    2. `profile_picture`: Profile Picture of user.
    3. `post_counts`: Count of all posts, posted by user.
    4. `follower_counts`: Total followers of user.
    5. `following_counts`: Total following of user.
    """
    try:
        user_id = request.data.get("_id")
        user_id = ObjectId(user_id)
        user = UserDetails.objects.get(_id=user_id)

        if not user:
            return Response({
                'status':'error',
                'message' : "User not found",
            }, status=status.HTTP_404_NOT_FOUND)
        
        user_name = user.user_name
        profile_picture = user.profile_picture
        post_counts = get_post_counts(user_id)
        follower_counts = get_follower_counts(user_id)
        following_counts = get_following_counts(user_id)

        return Response({
            'status':'success',
            'data' : {
                'user_name' : user_name,
                'profile_picture' : profile_picture,
                'post_counts' : post_counts,
                'follower_counts' : follower_counts,
                'following_counts' : following_counts,
            }
        })
    except Exception as e:
        return Response({
            'status':'exception',
            'message': f'Exception : {e}'
        })

    

