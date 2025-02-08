from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [

    path('sendOtp/', SendOTP_API.as_view(), name='sendOTP-api'),
    path('verifyAndReg/', OTP_verification_API.as_view(), name='otpVerify-api'),
    path('login/', Login_API.as_view(), name='login-api'),
    path('access/', ValidateAccessToken_API.as_view(), name='access-api'),
    path('refresh/', RefreshToken_API.as_view(), name='refresh-api'),

]