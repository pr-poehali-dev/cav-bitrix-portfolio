'''
Business: Convert Yandex.Disk public URL to direct download URL
Args: event with public_url in query params or body
Returns: JSON with direct download URL
'''

import json
import urllib.parse
import urllib.request
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        public_url = None
        
        if method == 'GET':
            params = event.get('queryStringParameters', {})
            public_url = params.get('url')
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            public_url = body_data.get('url')
        
        if not public_url:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'url parameter is required'}),
                'isBase64Encoded': False
            }
        
        api_url = f'https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key={urllib.parse.quote(public_url)}'
        
        req = urllib.request.Request(api_url)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            direct_url = data.get('href')
            
            if not direct_url:
                raise Exception('No download URL in response')
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'direct_url': direct_url}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
