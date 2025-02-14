import redis
from rest_framework.response import Response
from rest_framework.exceptions import Throttled
from django.core.cache import cache



redis_client = redis.StrictRedis(decode_responses=True)

def rate_limit(max_request:int , time_window: int):
    
    def decorator(func):

        def wrapper(self, request, *args, **kwargs):
            client_id = request.user.id if request.user.is_authenticated else request.META.get('REMOTE_ADDR')
            endpoint = request.path
            redis_key = f"rate_limit:{client_id}:{endpoint}"

            current_request = redis_client.get(redis_key)

            if current_request is None:
                # Request is accessed for the first time
                redis_client.set(redis_key, 1, ex=time_window)

            elif int(current_request) < max_request:
                redis_client.incr(redis_key)
            
            else:
                retry_after = redis_client.ttl(redis_key)
                raise Throttled(detail="Rate Limit Exceeded")
            
            return func(self, request, *args, **kwargs)
        
        return wrapper
    
    return decorator
        


import random        
def random_OTP():
    otp = random.randint(100000, 9999999)
    return str(otp)


def OTP_verification(phone_no: str):
    otp = random_OTP()
    cache.set(f"{phone_no}:{otp}")

    # Send OTP to 
    #SNS service
    

    # if sns service validated
