import json
import os
from typing import Dict, Any
import boto3
from botocore.exceptions import ClientError
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Fix S3 permissions for all partner logos to make them publicly accessible
    Args: event with httpMethod
    Returns: JSON with results of permission updates
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
    database_url = os.environ.get('DATABASE_URL')
    
    if not all([aws_access_key_id, aws_secret_access_key, s3_bucket_name, database_url]):
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Required credentials not configured'}),
            'isBase64Encoded': False
        }
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        cur.execute('SELECT id, name, logo_url FROM partner_logos WHERE logo_url LIKE %s', 
                   ('%storage.yandexcloud.net%',))
        partners = cur.fetchall()
        
        cur.close()
        conn.close()
        
        if not partners:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'message': 'No S3 files found to fix',
                    'fixed': 0
                }),
                'isBase64Encoded': False
            }
        
        s3_client = boto3.client(
            's3',
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key,
            endpoint_url=s3_endpoint_url if s3_endpoint_url else None,
            region_name=s3_region
        )
        
        fixed_count = 0
        failed_files = []
        
        for partner_id, partner_name, logo_url in partners:
            if 'storage.yandexcloud.net' in logo_url:
                key = logo_url.split(f'{s3_bucket_name}/')[-1]
                
                try:
                    # Скачиваем файл
                    response = s3_client.get_object(
                        Bucket=s3_bucket_name,
                        Key=key
                    )
                    file_body = response['Body'].read()
                    content_type = response.get('ContentType', 'image/jpeg')
                    
                    # Загружаем заново с публичным доступом
                    s3_client.put_object(
                        Bucket=s3_bucket_name,
                        Key=key,
                        Body=file_body,
                        ContentType=content_type,
                        ACL='public-read'
                    )
                    fixed_count += 1
                except ClientError as e:
                    failed_files.append({
                        'partner': partner_name,
                        'file': key,
                        'error': str(e)
                    })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'message': f'Fixed permissions for {fixed_count} files',
                'fixed': fixed_count,
                'total': len(partners),
                'failed': failed_files
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Failed to fix permissions',
                'message': str(e)
            }),
            'isBase64Encoded': False
        }