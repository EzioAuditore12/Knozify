from Authentication_Service.models import UserDetails
from Profile_Service.models import Following
from bson import ObjectId
from Streaming_Service.models import Posts

def get_post_counts(user_id: ObjectId):
    """
    Returns count of all post posted by user.

    :param user_id: Object User Id of user.
    """
    user = UserDetails.objects.get(_id=user_id)
    count = int(Posts.objects.filter(uploader=user).count())
    return count


def get_follower_counts(user_id: ObjectId) -> int:
    """
    Returns all followers of user.
    \n
    Uses followee to get all people who follow the user

    :param user_id: Object User Id of user.
    """
    user = UserDetails.objects.get(_id=user_id)
    count = int(Following.objects.filter(followee=user).count())
    return count


def get_following_counts(user_id: ObjectId) -> int:
    """
    Returns all followings of user.
    \n
    Uses follower to get count of all people who is followed by user.
    
    :param user_id: Object User Id of user.
    """
    user = UserDetails.objects.get(_id=user_id)
    count = int(Following.objects.filter(follower=user).count())
    return count