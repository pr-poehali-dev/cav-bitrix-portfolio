import json
import os
import base64
import hashlib
from typing import Dict, Any
from datetime import datetime
import boto3
from botocore.exceptions import ClientError

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Upload partner logo to S3 and return public URL
    Args: event with httpMethod, body containing base64 image
    Returns: JSON with image URL
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    aws_access_key_id = os.environ.get('AWS_ACCESS_KEY_ID')
    aws_secret_access_key = os.environ.get('AWS_SECRET_ACCESS_KEY')
    s3_bucket_name = os.environ.get('S3_BUCKET_NAME')
    s3_endpoint_url = os.environ.get('S3_ENDPOINT_URL')
    s3_region = os.environ.get('S3_REGION', 'ru-central1')
    
    if not all([aws_access_key_id, aws_secret_access_key, s3_bucket_name]):
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'S3 credentials not configured'}),
            'isBase64Encoded': False
        }
    
    body = json.loads(event.get('body', '{}'))
    image_data = body.get('image')
    filename = body.get('filename', 'logo.png')
    
    if not image_data:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Image data is required'}),
            'isBase64Encoded': False
        }
    
    if ',' in image_data:
        image_data = image_data.split(',')[1]
    
    image_bytes = base64.b64decode(image_data)
    
    file_hash = hashlib.md5(image_bytes).hexdigest()
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    ext = filename.rsplit('.', 1)[-1] if '.' in filename else 'png'
    new_filename = f'partner-logos/{timestamp}_{file_hash}.{ext}'
    
    content_type_map = {
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        'webp': 'image/webp'
    }
    content_type = content_type_map.get(ext.lower(), 'application/octet-stream')
    
    s3_client = boto3.client(
        's3',
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        endpoint_url=s3_endpoint_url if s3_endpoint_url else None,
        region_name=s3_region
    )
    
    s3_client.put_object(
        Bucket=s3_bucket_name,
        Key=new_filename,
        Body=image_bytes,
        ContentType=content_type,
        ACL='public-read'
    )
    
    if s3_endpoint_url and 'yandexcloud' in s3_endpoint_url:
        s3_url = f'https://storage.yandexcloud.net/{s3_bucket_name}/{new_filename}'
    else:
        s3_url = f'https://{s3_bucket_name}.s3.amazonaws.com/{new_filename}'
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'url': s3_url,
            'filename': new_filename
        }),
        'isBase64Encoded': False
    }