import boto3
import uuid
import os

def upload_to_S3(file) -> list:
    """
    Uploads Video/Image to Designated **AWS S3**

    :param file: Video or Image file that came from API request.

    :return: [**Bucket URL**,1] if uploaded successfully, else [**None**,error]
    """

    s3 = boto3.client(
            's3',
            aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
            region_name=os.environ.get("AWS_REGION")
        )
    video_name = list(str(file.name).split(" "))[0]
    folder_name = f"videos/{uuid.uuid4()}"
    file_name = f"{folder_name}/{video_name}"


    # Upload configuration
    try:
        s3.upload_fileobj(
            file,
            os.environ.get("AWS_STORAGE_BUCKET_NAME"),
            file_name,
            ExtraArgs={
                "ContentType": file.content_type,
                "ContentDisposition": "inline",
                "CacheControl": "max-age=2592000"
            }
        )
    except Exception as upload_error:
        return [None, f'Upload Error: {str(upload_error)}']
    

     # Generate URL using the correct file name
    url = f"https://{os.environ.get('AWS_STORAGE_BUCKET_NAME')}.s3.amazonaws.com/{file_name}"

    return [url, 1]