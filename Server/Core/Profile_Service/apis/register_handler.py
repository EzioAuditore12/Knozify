from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status

# from .rate_limiter import rate_limit
from django.core.cache import cache

# Private Libraries
from Profile_Service.searializer import UserDetailsSearlizer
from Profile_Service.models import UserDetails
from .otp_handlers.otp_handler import OTP_Sender

# JWT authentication
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


otp_manager = OTP_Sender()

def send_OTP(request):
    """
    Sends OTP using **AWS SNS service** to provided phone number in `request`. 
    """
    try:
        data = request.data 
        phone_no = data.get("phone_no")
        user_name = data.get("user_name")
        email = data.get("email")

        # SNS function to send otp (phone_no will be key to store otp in redis cache)
        user_exists = UserDetails.objects.filter(user_name=user_name).first()
        phone_no_exists = UserDetails.objects.filter(phone_no=phone_no).first()
        email_exists = UserDetails.objects.filter(email=email)

        if user_exists:
            return Response({
                'status':'error',
                'message':'User of this name already exists!!',
            }, status=status.HTTP_409_CONFLICT)
        

        if phone_no_exists:
            return Response({
                'status':'error',
                'message':'Same phone number already exists!!',
            }, status=status.HTTP_409_CONFLICT)
        
        if email_exists:
            return Response({
                'status':'error',
                'message':'Same phone number already exists!!',
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
    

def verify_registration(request):
    """
    Verifies OTP using function (that uses redis), and saves the data of user in database.
    \n
    See `OTP_Sender` class, it has **redis** cache to achieve this.
    """
    try:
        data = request.data
        user_name = data.get("user_name")
        otp = data.get("otp")
        phone_no = data.get("phone_no")
        profile_picture = data.get("profile_picture")

        # Creating a copy of data and remove OTP
        user_data = data.copy()
        user_data.pop("otp", None)

        verify = otp_manager.verify_otp(str(phone_no), otp)

        # Will deal with wallet id stuff in future
        user_data["wallet_id"] = "-" 

        
        if not profile_picture or profile_picture == "":
            domain = get_current_site(request).domain
            user_data["profile_picture"] = f"http://{domain}{settings.STATIC_URL}default-profile.jpg"


        
        
        if verify:
            serializer = UserDetailsSearlizer(data=user_data)
            if serializer.is_valid():
                serializer.save()
                user = UserDetails.objects.filter(user_name=user_name).first()
                refresh = RefreshToken.for_user(user)

                return Response({
                    'status': 'success',
                    'message': 'registration success',
                    'tokens': {
                        'access': str(refresh.access_token),
                        'refresh': str(refresh),
                    },
                    'user': {
                        '_id': str(user._id),
                        'username': user.user_name,
                        'account_type': user.account_type
                    }
                }, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({
                    'status': 'error',
                    'message': serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            'status': 'error',
            'message': 'Invalid OTP'
        }, status=status.HTTP_406_NOT_ACCEPTABLE)

    except Exception as e:
        print(f"Error in OTP verification: {str(e)}")
        return Response({
            'status': 'error',
            'message': 'An error occurred during verification'
        }, status=status.HTTP_400_BAD_REQUEST)