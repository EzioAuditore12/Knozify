import pytest
from rest_framework.test import APIClient
from rest_framework import status
from .models import UserDetails
from bson import ObjectId
import json

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def test_user_data():
    return {
        "user_name": "testuser",
        "email": "test@example.com",
        "password": "testpass@123",
        "phone_no": "1234567890",
        "account_type": "PB",
        "profile_picture": "",
        "wallet_id": "-"
    }

@pytest.mark.django_db
class TestRegistrationAPIs:
    def test_send_otp(self, api_client, test_user_data):
        """Test sending OTP for registration"""
        data = {
            "phone_no": test_user_data["phone_no"],
            "user_name": test_user_data["user_name"],
            "email": test_user_data["email"],
        }
        response = api_client.post('/api/user/sendOtp/', data=data, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['status'] == 'sucess'
        assert 'otp' in response.data

    def test_verify_registration(self, api_client, test_user_data):
        """Test OTP verification and user registration"""
        # First send OTP
        send_otp_response = api_client.post('/api/user/sendOtp/', data={
            "phone_no": test_user_data["phone_no"],
            "user_name": test_user_data["user_name"],
            "email": test_user_data["email"]
        }, format='json')
        
        assert send_otp_response.status_code == status.HTTP_200_OK
        otp = send_otp_response.data['otp']
        
        # Verify registration with OTP
        test_user_data['otp'] = otp
        response = api_client.post('/api/user/verifyAndReg/', 
                                 data=test_user_data, 
                                 format='json')
        
        assert response.status_code == status.HTTP_202_ACCEPTED
        assert response.data['status'] == 'success'
        assert 'tokens' in response.data
        assert 'user' in response.data

@pytest.mark.django_db
class TestLoginAPIs:
    @pytest.fixture
    def create_test_user(self, api_client, test_user_data):
        """Fixture to create a test user"""
        # First send OTP
        send_otp_response = api_client.post('/api/user/sendOtp/', data={
            "phone_no": test_user_data["phone_no"],
            "user_name": test_user_data["user_name"],
            "email": test_user_data["email"]
        }, format='json')
        
        test_user_data['otp'] = send_otp_response.data['otp']
        return api_client.post('/api/user/verifyAndReg/', 
                             data=test_user_data, 
                             format='json')

    def test_login_success(self, api_client, test_user_data, create_test_user):
        """Test successful login"""
        login_data = {
            "user_name": test_user_data["user_name"],
            "password": test_user_data["password"]
        }
        response = api_client.post('/api/user/login/', 
                                 data=login_data, 
                                 format='json')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['status'] == 'success'
        assert 'tokens' in response.data
        assert 'user' in response.data

    def test_login_wrong_password(self, api_client, test_user_data, create_test_user):
        """Test login with wrong password"""
        login_data = {
            "user_name": test_user_data["user_name"],
            "password": "wrongpassword"
        }
        response = api_client.post('/api/user/login/', 
                                 data=login_data, 
                                 format='json')
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert response.data['status'] == 'error'

@pytest.mark.django_db
class TestTokenAPIs:
    @pytest.fixture
    def authenticated_tokens(self, api_client, test_user_data):
        """Fixture to get authentication tokens"""
        # Create user through registration
        send_otp_response = api_client.post('/api/user/sendOtp/', data={
            "phone_no": test_user_data["phone_no"],
            "user_name": test_user_data["user_name"],
            "email": test_user_data["email"]
        }, format='json')
        
        test_user_data['otp'] = send_otp_response.data['otp']
        response = api_client.post('/api/user/verifyAndReg/', 
                                 data=test_user_data, 
                                 format='json')
        return response.data['tokens']

    def test_verify_access_token(self, api_client, authenticated_tokens):
        """Test access token verification"""
        api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {authenticated_tokens["access"]}')
        response = api_client.get('/api/user/access/', format='json')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['status'] == 'success'
        assert 'user' in response.data

    def test_refresh_token(self, api_client, authenticated_tokens):
        """Test refresh token endpoint"""
        refresh_data = {
            "refresh": authenticated_tokens["refresh"]
        }
        response = api_client.post('/api/user/refresh/', 
                                 data=refresh_data, 
                                 format='json')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['status'] == 'success'
        assert 'tokens' in response.data
        assert 'new-access' in response.data['tokens']

    def test_invalid_refresh_token(self, api_client):
        """Test refresh token endpoint with invalid token"""
        refresh_data = {
            "refresh": "invalid_token"
        }
        response = api_client.post('/api/user/refresh/', 
                                 data=refresh_data, 
                                 format='json')
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert response.data['status'] == 'error'