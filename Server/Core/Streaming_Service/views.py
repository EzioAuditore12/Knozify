from rest_framework.views import APIView

# Private Imports
from .apis.reels.uploadReel_api import upload_reel
from .apis.reels.get_uploded_reels import get_uploads
from .apis.posts.uploadPost_api import upload_post
from .apis.posts.getPost_api import get_posts

class UploadPost_API(APIView):
    """
    Upload the given Post to **AWS S3**\n
    Things you need to send\n

    ## Required

    1. `uploader_id`: User ID of person who wants to upload.
    2. `title`: Post title.
    3. `description`: Post description.
    
    ## Optional

    1. `image`: If user wants to upload image.
    2. `video`: If user wants to upload video.
    """
    def post(self, request):
        return upload_post(request)

class UploadReels_API(APIView):
    """
    Upload the given Reel to **AWS S3**\n
    Things you need to send\n

    ## Required

    1. `uploader_id`: User ID of person who wants to upload.
    2. `title`: Post title.
    3. `description`: Post description.
    4. `video`: Reels video that needs to be uploaded.
    """
    def post(self, request):
        return upload_reel(request)
    

class GetUploadedReels_API(APIView):
    """
    Returns all link of videos uploaded by user

    ## Required

    1. `uploader_id`: User ID of person who's Reel uploads you want.
    """

    def get(self, request):
        return get_uploads(request)
    

class GetUploadedPosts_API(APIView):
    """
    Returns all Meta data of Uploader (given `uploader_id`)

    ## Required

    1. `uploader_id`: User ID of person who's Posts uploads you want.
    """

    def get(self, request):
        return get_posts(request)