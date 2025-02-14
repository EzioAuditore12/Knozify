from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from bson import ObjectId  # Import ObjectId for MongoDB queries
from Authentication_Service.models import UserDetails

class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        user_id = validated_token.get('user_id')
        if not user_id:
            raise AuthenticationFailed('Token contained no identifiable user_id')

        try:
            # Convert user_id to ObjectId
            user_object_id = ObjectId(user_id)
            print(f"Converted user_id to ObjectId: {user_object_id}")

            user = UserDetails.objects.get(_id=user_object_id)
            print(f"Fetched user: {user}")

            if not user.is_active:
                raise AuthenticationFailed('User is inactive')

            return user
        except UserDetails.DoesNotExist:
            raise AuthenticationFailed('User not found')
        except Exception as e:
            raise AuthenticationFailed(f"Unexpected error: {str(e)}")
