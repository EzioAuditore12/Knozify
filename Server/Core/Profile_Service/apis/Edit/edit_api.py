from rest_framework import status
from rest_framework.response import Response
from Authentication_Service.models import UserDetails
from bson import ObjectId
import bcrypt

def edit_data(request):
    """
    Pass the **user_id** of user and edit the data (compulsary).
    \n
    **Optional Fields to update**

    1. `user_name`:Updates older user name to new provided `user_name`.
    2. `profile_picture`: Updates profile picture link of user.
    3. `phone_no`: Updates phone number of user.
    4. `email`: Updates new email of user.

    """
    try:
        user_id = ObjectId(request.data.get("_id"))
        user_name = request.data.get("user_name")
        profile_picture = request.data.get("profile_picture")
        phone_no = request.data.get("phone_no")
        email = request.data.get("email")
        password = request.data.get("password")
        account_type = request.data.get("account_type")

        edited_fields = {}

        user = UserDetails.objects.get(_id=user_id)

        if account_type != "" and account_type:
            if account_type == 'PB' or account_type == 'PR':
                user.account_type = account_type
                edited_fields['account_type'] = account_type

            else:
                return Response({
                    'status' : 'error',
                    'message' : "Kindly Provide either 'PR'(Private account), or 'PB'(Public account) in input",
                })
            
        
        if user_name != "" and user_name:
            user.user_name = user_name
            edited_fields['user_name'] = user_name

        if profile_picture != "" and profile_picture:
            user.profile_picture = profile_picture
            edited_fields['profile_picture'] = profile_picture

        if phone_no != "" and phone_no:
            user.phone_no = phone_no
            edited_fields['phone_no'] = phone_no

        if email != "" and email:
            user.email = email
            edited_fields['email'] = email


        if password != "" and password:
            hashed_password = bcrypt.hashpw(
            password.encode('utf-8'), 
            bcrypt.gensalt(rounds=14)
            ).decode('utf-8')

            user.password = hashed_password
            edited_fields['password'] = 'user new password'


        user.save()

        return Response({
            'status':'success',
            'Updated fields': edited_fields,
        }, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({
            'status': 'exception',
            'message' : f'Exception: {e}',
        }, status=status.HTTP_400_BAD_REQUEST)

    
