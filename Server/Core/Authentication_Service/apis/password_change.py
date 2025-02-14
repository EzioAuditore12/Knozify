import bcrypt
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status

# from .rate_limiter import rate_limit

# Private Libraries
from Authentication_Service.models import UserDetails
from .otp_handlers.otp_handler import OTP_Sender


otp_manager = OTP_Sender()

def send_OTP_forPassword(request):
    """
    Sends OTP using **AWS SNS service** to provided phone number in `request`. 
    """
    try:
        data = request.data 
        phone_no = data.get("phone_no")

        # SNS function to send otp (phone_no will be key to store otp in redis cache)
        phone_no_exists = UserDetails.objects.filter(phone_no=phone_no).first()


        if not phone_no_exists:
            return Response({
                'status':'error',
                'message':'No such fookin phone number present in DB',
            }, status=status.HTTP_409_CONFLICT)


        otp = otp_manager.send_otp(str(phone_no))

        return Response({
            'status':'sucess',
            'otp' : str(otp),
        }, status=status.HTTP_200_OK)

    except Exception as e:
        print(e)
        return Response({
            'Exception' : str(e),
        }, status=status.HTTP_400_BAD_REQUEST)
    


def verify_and_change_password(request):
    """
    **Changes Password if OTP is correct**.
    \n
    See `OTP_Sender` class, it has **redis** cache to achieve this.
    """
    try:
        data = request.data
        otp = data.get("otp")
        user_phone_no = data.get("phone_no")
        user_password = data.get("password")

        verify = otp_manager.verify_otp(str(user_phone_no), otp)


        if verify:

            user = UserDetails.objects.get(phone_no=user_phone_no)
            if user.password == user_password:
                return Response({
                    'status' : 'error',
                    'message' : 'The person wrote same password as last time'
                }, status=status.HTTP_406_NOT_ACCEPTABLE)
            

            # Hash new password
            hashed_password = bcrypt.hashpw(
                user_password.encode('utf-8'), 
                bcrypt.gensalt(rounds=14)
            ).decode('utf-8')

            user.password=hashed_password
            user.save()

            return Response({
                'status': 'success',
                'message': 'successfull password update',

            }, status=status.HTTP_200_OK)

        return Response({
            'status': 'error',
            'message': 'Invalid OTP'
        }, status=status.HTTP_406_NOT_ACCEPTABLE)

    except Exception as e:
        print(f"Error in OTP verification: {str(e)}")
        return Response({
            'status': 'error',
            'message': f'Exception occured : {e}'
        }, status=status.HTTP_400_BAD_REQUEST)