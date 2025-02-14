from rest_framework.response import Response
from rest_framework import status
from bcrypt import checkpw

# Private Libraries
from Authentication_Service.models import UserDetails

# JWT authentications
from rest_framework_simplejwt.tokens import RefreshToken

# Will get if for future to authenticate apis
from rest_framework.permissions import IsAuthenticated
from .authorization.auth import CustomJWTAuthentication

def login_user(request):
    """
    Does the login part
    """
    try:
        data = request.data
        user_name = data.get("user_name")
        password = data.get("password")

        user = UserDetails.objects.filter(user_name=user_name).first()

        if not user:
            return Response({
                'status': 'error',
                'error': 'User not found'
            }, status=status.HTTP_404_NOT_FOUND)

        try:
            check_password = checkpw(
                password.encode('utf-8'),
                user.password.encode('utf-8')
            )
        except Exception as e:
            print(f"Password check error: {str(e)}")
            return Response({
                'status': 'error',
                'error': 'Password verification failed'
            }, status=status.HTTP_400_BAD_REQUEST)

        if check_password:
            refresh = RefreshToken.for_user(user)
            return Response({
                'status': 'success',
                'tokens': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                },
                'user': {
                    '_id': str(user._id),
                    'username': user.user_name,
                    'profile_picture' : user.profile_picture,
                    'account_type': user.account_type,
                }
            }, status=status.HTTP_200_OK)

        return Response({
            'status': 'error',
            'error': 'Invalid password'
        }, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        print(f"Login error: {str(e)}")
        return Response({
            'status': "error",
            'message': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)