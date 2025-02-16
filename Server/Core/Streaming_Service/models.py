from djongo import models
from Authentication_Service.models import UserDetails
from bson import ObjectId

class Posts(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId)
    uploader = models.ForeignKey(
        UserDetails,
        on_delete=models.CASCADE,
        null=False,
        related_name='uploader_id'
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    likes = models.IntegerField(default=0)
    shares = models.IntegerField(default=0)
    upload_time = models.DateTimeField(auto_now_add=True)
    post_type = models.CharField(max_length=10, default='Text')

    # Now adding either video or image
    image_link = models.CharField(max_length=300, null=True)


    thumbnail_link = models.CharField(max_length=300, null=True) # Only for video
    video_link = models.CharField(max_length=300, null=True)

    class Meta:
        db_table = 'Posts'


class Reels(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId)
    uploader = models.ForeignKey(
        UserDetails,
        on_delete=models.CASCADE,
        null=False,
        related_name='upload_id'
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    likes = models.IntegerField(default=0)
    shares = models.IntegerField(default=0)
    thumbnail_link = models.CharField(max_length=300)
    video_link = models.CharField(max_length=300, null=True)
    upload_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'Reels'