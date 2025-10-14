import json
import os
from typing import Dict, Any
import boto3
from botocore.exceptions import ClientError
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get partner logos with presigned URLs for S3 files
    Args: event with httpMethod
    Returns: JSON array of partners with accessible URLs
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
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        cur.execute('''
            SELECT id, name, logo_url, website_url, display_order, is_active, created_at, updated_at
            FROM partner_logos
            WHERE is_active = true
            ORDER BY display_order
        ''')
        
        partners = []
        for row in cur.fetchall():
            partner = {
                'id': row[0],
                'name': row[1],
                'logo_url': row[2],
                'website_url': row[3],
                'display_order': row[4],
                'is_active': row[5],
                'created_at': row[6].isoformat() if row[6] else None,
                'updated_at': row[7].isoformat() if row[7] else None
            }
            
            # Генерируем presigned URL для файлов в S3
            if 'storage.yandexcloud.net' in partner['logo_url']:
                aws_access_key_id = os.environ.get('AWS_ACCESS_KEY_ID')
                aws_secret_access_key = os.environ.get('AWS_SECRET_ACCESS_KEY')
                s3_bucket_name = os.environ.get('S3_BUCKET_NAME')
                s3_endpoint_url = os.environ.get('S3_ENDPOINT_URL')
                s3_region = os.environ.get('S3_REGION', 'ru-central1')
                
                if all([aws_access_key_id, aws_secret_access_key, s3_bucket_name]):
                    try:
                        s3_client = boto3.client(
                            's3',
                            aws_access_key_id=aws_access_key_id,
                            aws_secret_access_key=aws_secret_access_key,
                            endpoint_url=s3_endpoint_url if s3_endpoint_url else None,
                            region_name=s3_region
                        )
                        
                        key = partner['logo_url'].split(f'{s3_bucket_name}/')[-1]
                        
                        # Генерируем presigned URL на 1 час
                        presigned_url = s3_client.generate_presigned_url(
                            'get_object',
                            Params={
                                'Bucket': s3_bucket_name,
                                'Key': key
                            },
                            ExpiresIn=3600
                        )
                        
                        partner['logo_url'] = presigned_url
                    except Exception:
                        pass
            
            partners.append(partner)
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(partners),
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
                'error': 'Failed to fetch partners',
                'message': str(e)
            }),
            'isBase64Encoded': False
        }
