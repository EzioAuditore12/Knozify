from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

# Private Libraries
from Authentication_Service.apis.authorization.auth import CustomJWTAuthentication
 

# API classes
from .apis.register_handler import send_OTP, verify_registration
from .apis.login import login_user
from .apis.tokens import verify_access_token, verify_refresh_token
from .apis.password_change import send_OTP_forPassword, verify_and_change_password


class SendOTP_API(APIView):
    """
    **Sends OTP for registeration**
    
        1. Parameters:
        - `request` :  request from API

        2. API input:
        - `phone_no` : phone number of user.
        - `user_name` : User name of user.
        - `email` : Email of user.
    """
    def post(self, request):
        return send_OTP(request=request)


class OTP_verification_API(APIView):
    """
    **Verifies OTP and saves User Info in Database (if correct)**
    
        1. Parameters:
        - `request` :  request from API

        2. API input:
        - data : All required **Registration data** in user.
        - `otp` : otp entered by **User**.
    """
    def post(self, request):
        return verify_registration(request=request)


class Login_API(APIView):
    """
    **Logins user if username exists and, is correct with correct password**

        1. Parameters:
        - `request` :  request from API
        
        2. Inputs:
        - `user_name` : User name of User.
        - `password` : password of User.
    """
    def post(self, request):
        return login_user(request=request)


class ValidateAccessToken_API(APIView):
    """
    **Verifies if access token of client is *correct* or not**

        1. Parameters:
        - `request` :  request from API
        
    """
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return verify_access_token(request=request)


class RefreshToken_API(APIView):
    """
    Verifies if Refresh token of client is **correct** or not
    and gives back **new access** token if **correct**

        1. Parameters:
        - `request` :  request from API

        2. Input:
        - `refresh` : Refresh Token of user.
        
    """
    def post(self, request, *args, **kwargs):
        return verify_refresh_token(request=request)
    


class SendOTPforPassChange_API(APIView):
    """
    **Sends OTP for password change, if phone number dosn't exist throws error**
    
        1. Parameters:
        - `request` :  request from API

        2. API input:
        - `phone_no` : phone number of user.
    """
    def post(self, request):
        return send_OTP_forPassword(request=request)


class PasswordChange_API(APIView):
    """
    Verifies `phone_no` of user and then sends otp,\n
    if **correct_otp**: allow password change\n
    else: don't allow.
    
        1. Parameters:
        - `request` :  request from API

        2. API input:
        - `phone_no` : phone number of user.
        - `otp` : Otp provided to user.
        - `password`` : New password user wants to be changed to.
    """
    def post(self, request):
        return verify_and_change_password(request)