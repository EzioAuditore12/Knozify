from rest_framework import status
from rest_framework.response import Response
from Authentication_Service.models import UserDetails
from Profile_Service.models import Following

from bson import ObjectId

def follow_person(request):
    """
    Accept follow request of person only if the person is PUBLIC, else send to request Table.
    """

    try:
        follower_id = ObjectId(request.data.get("follower_id"))
        followee_id = ObjectId(request.data.get("followee_id"))

        followee = UserDetails.objects.get(_id=followee_id)
        account_type = followee.account_type
        

        if account_type == 'PR':
            # Send request to follow request table

            return Response({
                'status' : 'success',
                'message' : f'The request to {followee.user_name} has been sent, will be accepted when it accepts (since its Private account)',
            }, status=status.HTTP_200_OK)
        
        
        follower = UserDetails.objects.get(_id=follower_id)
        follow_now = Following(
            follower = follower,
            followee = followee,
        )

        follow_now.save()

        return Response({
            'status' : 'success',
            'message' :  f'{follower.user_name} now follows {followee.user_name} because of Public account'
        }, status=status.HTTP_202_ACCEPTED)
        


    except Exception as e:
        return Response({
            'status' : 'exception',
            'message' : f'Exception : {e}',
        }, status=status.HTTP_400_BAD_REQUEST)