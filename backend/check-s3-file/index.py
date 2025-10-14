import json
import os
from typing import Dict, Any
import boto3
from botocore.exceptions import ClientError

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Check if S3 file exists and list all files in partner-logos folder
    Args: event with httpMethod
    Returns: JSON with file information
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
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
            'body': json.dumps({'error': 'S3 not configured'}),
            'isBase64Encoded': False
        }
    
    try:
        s3_client = boto3.client(
            's3',
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key,
            endpoint_url=s3_endpoint_url if s3_endpoint_url else None,
            region_name=s3_region
        )
        
        # Список всех файлов в папке partner-logos
        response = s3_client.list_objects_v2(
            Bucket=s3_bucket_name,
            Prefix='partner-logos/'
        )
        
        files = []
        if 'Contents' in response:
            for obj in response['Contents']:
                try:
                    # Получаем метаданные файла
                    head = s3_client.head_object(
                        Bucket=s3_bucket_name,
                        Key=obj['Key']
                    )
                    
                    files.append({
                        'key': obj['Key'],
                        'size': obj['Size'],
                        'last_modified': obj['LastModified'].isoformat(),
                        'content_type': head.get('ContentType', 'unknown'),
                        'acl': head.get('x-amz-acl', 'unknown')
                    })
                except Exception as e:
                    files.append({
                        'key': obj['Key'],
                        'size': obj['Size'],
                        'error': str(e)
                    })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'bucket': s3_bucket_name,
                'files_count': len(files),
                'files': files
            }),
            'isBase64Encoded': False
        }
        
    except ClientError as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'S3 error',
                'message': str(e)
            }),
            'isBase64Encoded': False
        }
