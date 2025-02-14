# Profile Service
This Service will handle mostly registration and login process of the user.
\
The apis used are
## Registration
These apis will handle first process of **registration** process invovling:
1. Sending OTP to User.
2. Verifying OTP of User and register them.

### Sending OTP to User (Post request)
This api will use [AWS SNS Service](https://aws.amazon.com/sns/) to send OTP sms to users. ***(OTP will be valid for 5 mins only)***
```bash
http://127.0.0.1:8000/api/usersendOtp/reg/
```
**Input Body**
```json
{
	"user_name" : "jaiswal@123",
	"phone_no" : "+91909818713",
	"email" : "jaiswal12@gmail.com"
}
```
If everything goes right:
\
**OUTPUT:**
```json
{
	"status": "sucess",
	"otp": "otp sent successfully"
}
```
**Failure Conditions**:
1. If user is re-trying to register again with already existing `user_name`, `phone_no` and `password`
    ```json
    {
        "status":"error",
        "message":"User of this name already exists!!",
     }
    ```
    ```json
    {
        "status":"error",
        "message":"User of this phone number already exists!!",
     }
    ```
    ```json
    {
        "status":"error",
        "message":"User of this email already exists!!",
     }
    ```
2. Error from AWS SNS Service 
    ```json
    {
        "status":"error",
        "message" : "AWS Service isn't working right now"
    }
    ```
3. Any Unexpected error:
    ```json
    {
        "Exception" : "The exception"
    }
    ```

### OTP Verification and Regisration
After the API successfully sends **OTP** to user the user will then be located to OTP filling page, where after entering OTP, this API will:
1. Verify OTP.
2. Register User, if OTP is correct.

```bash
http://127.0.0.1:8000/api/user/verifyAndReg/
```
**INPUT BODY**:
```json
{
	"user_name" : "Manas123",
	"password" : "Manas@1234",
	"phone_no" : "+91909818713",
	"email" : "manas12@gmail.com",
	"profile_picture" : "",
	"otp" : "551970"
}
```
If everything goes right
\
**OUTPUT**
```json
{
	"status": "success",
	"message": "registration success",
	"tokens": {
		"access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5MjA1NDU4LCJpYXQiOjE3MzkxMTkwNTgsImp0aSI6IjZmZTAwZGQyMzI1OTQxOTJiMTQ4YjQ5NDg5MGMwNzhmIiwidXNlcl9pZCI6IjY3YThkOWQyN2YyNjA4ZTAyOTYwNDg0NSJ9.DKzy-LdjYxON8_pbeo8bEVqu01BlIROpKUhZil5yyd4",
		"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczOTcyMzg1OCwiaWF0IjoxNzM5MTE5MDU4LCJqdGkiOiJiNWUxMGIxMWM1NzE0M2VlOWE0MDMwMTY4YWVmYjhkYSIsInVzZXJfaWQiOiI2N2E4ZDlkMjdmMjYwOGUwMjk2MDQ4NDUifQ.dvoS35uWubobXA-22A9-ft5xZFLK9kRTLTHwrT9xrik"
	},
	"user": {
		"_id": "67a8d9d27f2608e029604845",
		"username": "Manas123",
		"account_type": "PB"
	}
}
```
**What are these KEYS???:**
- `access`: ***Access token*** of user, so that user don't need to login everytime whenever they opens app.
- `refresh` : ***Refresh token*** of user, to renew acces token when its expired.
- `_id` : ***User Id of User*** will be used to grab all user's configurations and assets of their account.
- `username` : The account user name of User (like **Its.your.Manas.114** the once you have seen in instagram).
- `account_type` : If the rather `PB`(**Public**) and `PR`(**Private**)

--- 

## Login Service
This Service will handle the login process of user, where user will enter their `username` and `password` to login in the system. 

```bash
http://