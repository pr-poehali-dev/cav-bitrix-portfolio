import json
import os
import bcrypt
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Change admin password with current password verification
    Args: event with httpMethod, body containing current_password and new_password
          context with request_id
    Returns: HTTP response with new password hash or error
    '''
    method: str = event.get('httpMethod', 'GET')
    
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
    
    body_str = event.get('body', '{}')
    if not body_str or body_str.strip() == '':
        body_str = '{}'
    
    body_data = json.loads(body_str)
    current_password = body_data.get('current_password', '')
    new_password = body_data.get('new_password', '')
    
    if not current_password or not new_password:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Current and new passwords required'}),
            'isBase64Encoded': False
        }
    
    if len(new_password) < 8:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'New password must be at least 8 characters'}),
            'isBase64Encoded': False
        }
    
    admin_password_hash = os.environ.get('ADMIN_PASSWORD_HASH')
    
    if not admin_password_hash:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Admin password not configured'}),
            'isBase64Encoded': False
        }
    
    current_password_bytes = current_password.encode('utf-8')
    hash_bytes = admin_password_hash.encode('utf-8')
    
    if not bcrypt.checkpw(current_password_bytes, hash_bytes):
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Current password is incorrect'}),
            'isBase64Encoded': False
        }
    
    new_password_bytes = new_password.encode('utf-8')
    salt = bcrypt.gensalt(rounds=10)
    new_hash = bcrypt.hashpw(new_password_bytes, salt)
    new_hash_str = new_hash.decode('utf-8')
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'message': 'Password changed successfully',
            'new_hash': new_hash_str
        }),
        'isBase64Encoded': False
    }
