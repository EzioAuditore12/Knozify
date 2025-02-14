import os
import boto3
import random
from datetime import datetime, timedelta
from dotenv import load_dotenv
import logging
from django.core.cache import cache


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


load_dotenv()

class OTP_Sender:

    def __init__(self):
        
        # Initialize SNS client
        self.sns = boto3.client(
            "sns",
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
            region_name=os.getenv("AWS_REGION")
        )

        self.otp_dct = {}


    def format_phone_number(self, phone_number: str) -> str:
        """Format phone number to E.164 format"""
        # Remove any non-digit characters
        cleaned = ''.join(filter(str.isdigit, phone_number))
        # Add country code if not present
        if not cleaned.startswith('91'):
            cleaned = f'91{cleaned}'
        return f'+{cleaned}'

    # Replace with your own database connection

    def store_otp(self, phone_no:str, otp:str, expires_at:int):
        """
        params
        ### phone_no will be cache key
        """
        print(f"Chache key: {phone_no}")
        cache.set(f"{phone_no}", otp, timeout=expires_at)
        # self.otp_dct[phone_no] = otp
    

    def validate_otp(self, phone_no:str, user_otp:str) -> bool:
        """
        Used for validating *otp*
        """

        true_otp = cache.get(f"{phone_no}")
        if true_otp is None or user_otp is None:
            return False
        
        # true_otp = self.otp_dct[phone_no]
        # print("True OPT------------", true_otp)
        # print("USEr OPT------------", user_otp)
        
        return str(user_otp) == str(true_otp)
    

    def send_otp(self, phone_number:str) -> bool:
        otp = str(random.randint(100000, 999999))
        expires_at = 300
        print(f"The otp you get should be: {otp}")

        formatted_number = self.format_phone_number(phone_number)

        print(formatted_number)
        logger.info(f"Sending OTP to {formatted_number}")
        # Store in your database
        self.store_otp(phone_number, otp, expires_at)

        response = None
        try:
            # Send via SMS
            # response = self.sns.publish(
            #     PhoneNumber=formatted_number,
            #     Message=f"Your OTP is {otp}. Valid for 5 minutes.",
            #     MessageAttributes={
            #         'AWS.SNS.SMS.SMSType': {
            #             'DataType': 'String',
            #             'StringValue': 'Transactional'
            #         }
            #     }
            # )
            print(response)
            return otp
        
        except Exception as e:
            # if entered phone number is incorrect
            print(e)
            logger.info(f"SNS Response: {response}")
            return "no otp"

    def verify_otp(self, phone_number, user_otp):
        # Validate from your database
        return self.validate_otp(phone_number, user_otp)


if __name__ == "__main__":
    phone_no = "+919098187152"
    daksh_no = "+916398322317"

    o = OTP_Sender()

    o.send_otp(phone_number=phone_no)

    otp_input = input("Enter the otp now: ")

    verify = o.verify_otp(phone_no, otp_input)

    if verify:
        print("Success OTP is correct")
    
    else:
        print("OTP is wrong bruh")
