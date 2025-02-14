from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

# Private Libraries
from .apis.About.about_api import about_me
from .apis.Edit.edit_api import edit_data
 
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