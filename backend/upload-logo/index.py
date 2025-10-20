import json
import base64
import os
import uuid
from typing import Dict, Any
import boto3
from botocore.client import Config

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Upload logo image to S3 storage
    Args: event with httpMethod, body containing base64 image and filename
    Returns: JSON with public CDN URL
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
    
    # Получаем настройки S3 из переменных окружения
    s3_bucket = os.environ.get('S3_BUCKET_NAME')
    s3_endpoint = os.environ.get('S3_ENDPOINT_URL')
    s3_region = os.environ.get('S3_REGION', 'ru-central1')
    aws_access_key = os.environ.get('AWS_ACCESS_KEY_ID')
    aws_secret_key = os.environ.get('AWS_SECRET_ACCESS_KEY')
    
    if not all([s3_bucket, aws_access_key, aws_secret_key]):
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'S3 configuration is missing'}),
            'isBase64Encoded': False
        }
    
    # Декодируем base64
    image_bytes = base64.b64decode(image_data)
    
    # Определяем тип файла и расширение
    ext = filename.rsplit('.', 1)[-1].lower() if '.' in filename else 'png'
    content_type_map = {
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        'webp': 'image/webp'
    }
    content_type = content_type_map.get(ext, 'image/png')
    
    # Генерируем уникальное имя файла
    file_key = f'logos/{uuid.uuid4()}.{ext}'
    
    # Подключаемся к S3
    s3_client = boto3.client(
        's3',
        endpoint_url=s3_endpoint,
        region_name=s3_region,
        aws_access_key_id=aws_access_key,
        aws_secret_access_key=aws_secret_key,
        config=Config(signature_version='s3v4')
    )
    
    # Загружаем файл в S3
    s3_client.put_object(
        Bucket=s3_bucket,
        Key=file_key,
        Body=image_bytes,
        ContentType=content_type,
        ACL='public-read'
    )
    
    # Формируем публичный URL для Yandex Object Storage
    if 'yandexcloud' in s3_endpoint or 'storage.yandexcloud' in s3_endpoint:
        public_url = f'https://{s3_bucket}.storage.yandexcloud.net/{file_key}'
    else:
        # Для других S3-совместимых хранилищ
        public_url = f'{s3_endpoint}/{s3_bucket}/{file_key}'
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'url': public_url,
            'type': 's3'
        }),
        'isBase64Encoded': False
    }