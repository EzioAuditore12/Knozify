from rest_framework import status
from rest_framework.response import Response
from bson import ObjectId

from Authentication_Service.models import UserDetails
from Streaming_Service.models import Posts
from Streaming_Service.apis.reels.utils import convert_to_mp4, generate_thumbnail
from .s3_uploader import upload_to_S3


def upload_post(request):
    """
    Upload the post, requested by user to.\n
    Can take `image`, `video` or nothing to upload.
    """
    try:
        uploader_id = ObjectId(request.data.get("uploader_id"))
        title = request.data.get("title")
        description = request.data.get("description")
        image = request.FILES.get("image")
        video = request.FILES.get("video")

        user = UserDetails.objects.get(_id=uploader_id)
        if not user:
            return Response({
                'status':'error',
                'message' : 'User of this ID not found, please recheck it',
            }, status=status.HTTP_404_NOT_FOUND)
        

        if not title:
            return Response({
                'status':'error',
                'message':'Please give title'
            })
        
        # Deals with description
        if not description and (not video or not image):
            return Response({
                'status':'error',
                'message' : "if not uploading image/video, then kindly provide description",
            }, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        else:
            description = "No description provided"


        if not image and not video:
            post = Posts(
                uploader = user,
                title=title,
                description=description,
            )
            post.save()
            return Response({
                'status':'success',
                'message':f"{user.user_name} uploaded Post only with Title and Description"
            })


        if image:
            image_url = upload_to_S3(image)

            if image_url[0] is None:
                return Response({
                    'status':'error',
                    'message': f"Error uploading Image: {image_url[1]}",
                }, status=status.HTTP_400_BAD_REQUEST)
            
            post = Posts(
                uploader = user,
                title=title,
                description=description,
                image_link=image_url[0],
                post_type = "Image",
            )

            post.save()
            return Response({
                'status':'success',
                'message':f'Image in post of user: {user.user_name} has been successfully uploaded',
                'image_link': f"{image_url[0]}"
            }, status=status.HTTP_200_OK)
        

        if video:
            # Try to convert video to MP4
            try:
                video = convert_to_mp4(video)
            except Exception as e:
                return Response({
                    'status': 'error',
                    'message': f'Error converting video: {str(e)}'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Now generate Thumbnail
            try:
                video_thumbnail = generate_thumbnail(video)
                # Reset video file pointer to beginning for next operation
                video.seek(0)
            except Exception as e:
                return Response({
                    'status': 'error',
                    'message': f'Error generating thumbnail: {str(e)}'
                }, status=status.HTTP_400_BAD_REQUEST)

            video_url = upload_to_S3(video)

            if video_url[0] is None:
                return Response({
                    'status':'error',
                    'message': f"Error uploading in Video: {video_url[1]}",
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Upload thumbnail
            thumbnail_upload = upload_to_S3(video_thumbnail)
            if thumbnail_upload[0] is None:
                return Response({
                    'status' : 'error',
                    'message' : f'Error uploading thumbnail: {thumbnail_upload[1]}'
                }, status=status.HTTP_400_BAD_REQUEST)
        

            post = Posts(
                uploader = user,
                title = title,
                description = description,
                thumbnail_link = thumbnail_upload[0],
                video_link = video_url[0],
                post_type = "Video",
            )

            post.save()
            return Response({
                'status':'success',
                'message':f'Image in post of user: {user.user_name} has been successfully uploaded',
                'video_link': f"{video_url[0]}",
                'thumbnail_link': f"{thumbnail_upload[0]}"
            }, status=status.HTTP_200_OK) 
        

    except Exception as e:
        return Response({
            'status':'exception',
            'message': f'Exception: {e}'
        }, status=status.HTTP_400_BAD_REQUEST)