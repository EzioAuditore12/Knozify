from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

def verify_access_token(request):
    """
    **Verifies if access token of client is *correct* or not**
    """
    try:
        user = request.user
        if not user:
            return Response({
                'status': 'error',
                'message': 'User not found'
            }, status=status.HTTP_404_NOT_FOUND)

        return Response({
            'status': 'success',
            'message': 'Access token is valid',
            'user': {
                '_id': str(user._id),
                'user_name': user.user_name,
                'account_type': user.account_type,
            }
        }, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"Token validation error: {str(e)}")
        return Response({
            'status': 'error',
            'message': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)
    


def verify_refresh_token(request):
    """
    Verifies if Refresh token of client is **correct** or not
    and gives back **new access** token if **correct**
    """
    try:
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({
                'status': 'error',
                'message': 'Refresh token is required'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Create refresh token instance
        token = RefreshToken(refresh_token)
        
        return Response({
            'status': 'success',
            'tokens': {
                'new-access': str(token.access_token),
            }
        }, status=status.HTTP_200_OK)

    except TokenError as e:
        print(f"Token refresh error: {str(e)}")
        return Response({
            'status': 'error',
            'message': 'Invalid or expired refresh token'
        }, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return Response({
            'status': 'error',
            'message': e
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)