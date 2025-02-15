from django.urls import path, include
from .views import *

urlpatterns = [
    path('upload/reel/', UploadReels_API.as_view(), name='upload-reel'),
    path('get/reels/', GetUploadedReels_API.as_view(), name='get-reels'),
    
]