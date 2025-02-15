from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

# Private Libraries
from .apis.About.about_api import about_me
from .apis.Edit.edit_api import edit_data
from .apis.Follow.follow_api import follow_person
 
class OpenProfile_API(APIView):
    """
    **Sends About Profile to API**
    
    :param user_id: Put the object user id here as Input in *Post Request*.
    :return: Returns keys required
    """
    def post(self, request):
        return about_me(request)


class EditProfile_API(APIView):
    """
    **Will be used to Edit Profile of user**

    :param user_id: Put the object user id here as Input in *Post Request*
    :return: Returns success else error.
    """
    def post(self, request):
        return edit_data(request)
    

class FollowProfile_API(APIView):
    """
    Will send follow request if account is **PR**(*Private*)\n
    Or automatically start following if **PB**(*Public*)

    :param follower_id: The current user (Who wants to follow).
    :param followee_Id: The person who current user wants to follow.
    """

    def post(self, request):
        return follow_person(request)