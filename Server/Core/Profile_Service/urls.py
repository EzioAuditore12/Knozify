from django.urls import path, include
from .views import *

urlpatterns = [
    path('access/', OpenProfile_API.as_view(), name='access-profile'),
    path('edit/', EditProfile_API.as_view(), name='edit-profile'),
    path('follow/', FollowProfile_API.as_view(), name='follow-send'),
]