from djongo import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from bson import ObjectId

class UserDetailsManager(BaseUserManager):
    """
    Manages Default Base User class, so that I can access Acess and Refresh Token Classes,
    Without having extra fields, that I don't need.
    """
    def create_user(self, user_name, password=None, **extra_fields):
        if not user_name:
            raise ValueError('Username is required')
        user = self.model(user_name=user_name, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, user_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(user_name, password, **extra_fields)

class UserDetails(AbstractBaseUser):
    """
    ### User Details Table
    1. `_id` : Object Id 
        - use bson please
        - from bson import ObjectId 
        - then `user_object_id` = ObjectId(`user_id`)) # Where `user_id` is in string
        - Now only pass `user_object_id` here in `_id`
    /
    2. `user_name` : String
        - accepts str, max 255, unique=True.
    /
    3. `email`: String
        - max 255
    /
    4. `password` : String
        - will be **hashed** using *bcrypt*
    /
    5. `phone_no` : String
        - yes... I need phone number in **STRING** 
    /
    6. `account_type` : String (PB/PR)
        - **PB** : Public account.
        - **PR** : Private account.
    """
    _id = models.ObjectIdField(primary_key=True, default=ObjectId)
    user_name = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255)
    password = models.TextField()
    phone_no = models.CharField(max_length=20)
    profile_picture = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    ACCOUNT_TYPE_CHOICE = [
        ('PR', 'PRIVATE'),
        ('PB', 'PUBLIC'),
    ]
    account_type = models.CharField(max_length=2, choices=ACCOUNT_TYPE_CHOICE, default='PB')
    wallet_id = models.CharField(max_length=200)
    
    objects = UserDetailsManager()
    USERNAME_FIELD = 'user_name'

    def __str__(self):
        return self.user_name

    class Meta:
        db_table = 'User_Details_Table'