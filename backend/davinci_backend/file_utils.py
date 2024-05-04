import os
import boto3
import strawberry
from botocore.exceptions import ClientError
from botocore.config import Config
from dotenv import load_dotenv
import davinci_backend.db.utils as db_utils


@strawberry.type
class S3UploadUrl:
    url: str
    key: str

    def __init__(self):
        self.key = db_utils.generate_id("img")

    def set_url(self, url: str):
        self.url = url


class S3Client:
    def __init__(self):
        load_dotenv()
        aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
        aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")

        session = boto3.Session(
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key,
        )
        self.client = session.client(
            "s3",
            config=Config(
                signature_version="v4",
            ),
        )

    def generate_upload_url(self):
        upload_url = S3UploadUrl()
        try:
            response = self.client.generate_presigned_url(
                ClientMethod="put_object",
                Params={
                    "Bucket": "davinci-image-input",
                    "Key": upload_url.key,
                },
                ExpiresIn=3000,  # 5 minutes
            )
            upload_url.set_signed_url_fields(response)
            return upload_url
        except ClientError as e:
            print(e)
            return None
