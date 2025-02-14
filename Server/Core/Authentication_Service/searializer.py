from rest_framework import serializers
from .models import UserDetails
from rest_framework.validators import UniqueValidator
import bcrypt

class UserDetailsSearlizer(serializers.ModelSerializer):
    """
    #### Searlize data and helps to save it in mongoDB
    - Use eg. `ser = UserDetailsSearlizer(data = data)`
    - then `ser.save()`
    - also will convert the password into hash *bcrypt*.
    """
    class Meta:
        model = UserDetails
        fields = ['user_name',
                  'email', 
                  'password', 
                  'phone_no',
                  'profile_picture',
                  'account_type',
                  'wallet_id']


    def create(self, validated_data):
        """
        Hash the password before saving
        """
        password = validated_data.get('password')
        hashed_password = bcrypt.hashpw(
            password.encode('utf-8'), 
            bcrypt.gensalt(rounds=14)
        ).decode('utf-8')
        
        validated_data['password'] = hashed_password
        return super().create(validated_data)
    

# Overriding the get_token method in your serializer to include the correct payload. For example:
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user_id'] = str(user._id) # using str so that fooking mongo DB can understand
        token['user_name'] = user.user_name
        return token