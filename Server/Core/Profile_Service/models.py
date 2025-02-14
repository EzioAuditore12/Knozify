from djongo import models
from Authentication_Service.models import UserDetails

class Following(models.Model):
    follower = models.ForeignKey(
        UserDetails,
        on_delete=models.CASCADE,
        null=True,
        related_name="following_follower"  
    )
    followee = models.ForeignKey(
        UserDetails,
        on_delete=models.CASCADE,
        null=True,
        related_name="following_followee"
    )

    class Meta:
        db_table = 'Following Records'


class Follow_Request_Pending(models.Model):
    follow_req_sender = models.ForeignKey(
        UserDetails,
        on_delete=models.CASCADE,
        null=True,
        related_name="follow_request_sent"
    )
    follow_req_reciever = models.ForeignKey(
        UserDetails,
        on_delete=models.CASCADE,
        null=True,
        related_name="follow_request_received"
    )
    request_datetime = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'Follow Request Pending'
