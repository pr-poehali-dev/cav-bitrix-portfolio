import json
import os
import psycopg2
import bcrypt
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления партнёрами (CRUD операции)
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id
    Returns: HTTP response с данными партнёров
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    admin_password = headers.get('x-admin-password') or headers.get('X-Admin-Password')
    
    admin_password_hash = os.environ.get('ADMIN_PASSWORD_HASH')
    
    if not admin_password or not admin_password_hash:
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
        }
    
    password_bytes = admin_password.encode('utf-8')
    hash_str = admin_password_hash.strip()
    
    if hash_str.startswith('$2a$'):
        hash_str = '$2b$' + hash_str[4:]
    
    hash_bytes = hash_str.encode('utf-8')
    
    is_valid = False
    try:
        is_valid = bcrypt.checkpw(password_bytes, hash_bytes)
    except Exception:
        pass
    
    if not is_valid:
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Unauthorized'}),
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
            'body': json.dumps({'error': 'DATABASE_URL not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    
    try:
        if method == 'GET':
            query_params = event.get('queryStringParameters') or {}
            partner_id = query_params.get('id')
            
            if partner_id:
                cursor.execute(
                    'SELECT id, login, name, discount_percent, is_active, created_at FROM partners WHERE id = %s',
                    (partner_id,)
                )
                row = cursor.fetchone()
                if row:
                    partner = {
                        'id': row[0],
                        'login': row[1],
                        'name': row[2],
                        'discount_percent': row[3],
                        'is_active': row[4],
                        'created_at': row[5].isoformat() if row[5] else None
                    }
                    result = partner
                else:
                    conn.close()
                    return {
                        'statusCode': 404,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Partner not found'}),
                        'isBase64Encoded': False
                    }
            else:
                cursor.execute(
                    'SELECT id, login, name, discount_percent, is_active, created_at FROM partners ORDER BY created_at DESC'
                )
                rows = cursor.fetchall()
                partners = []
                for row in rows:
                    partners.append({
                        'id': row[0],
                        'login': row[1],
                        'name': row[2],
                        'discount_percent': row[3],
                        'is_active': row[4],
                        'created_at': row[5].isoformat() if row[5] else None
                    })
                result = partners
            
            conn.close()
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            login = body.get('login', '').strip()
            password = body.get('password', '').strip()
            name = body.get('name', '').strip()
            discount_percent = body.get('discount_percent', 10)
            is_active = body.get('is_active', True)
            
            if not login or not password or not name:
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Login, password and name are required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                'INSERT INTO partners (login, password, name, discount_percent, is_active) VALUES (%s, %s, %s, %s, %s) RETURNING id',
                (login, password, name, discount_percent, is_active)
            )
            partner_id = cursor.fetchone()[0]
            conn.commit()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': partner_id, 'message': 'Partner created'}),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            partner_id = body.get('id')
            
            if not partner_id:
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Partner ID is required'}),
                    'isBase64Encoded': False
                }
            
            update_fields = []
            values = []
            
            if 'login' in body and body['login'].strip():
                update_fields.append('login = %s')
                values.append(body['login'].strip())
            
            if 'password' in body and body['password'].strip():
                update_fields.append('password = %s')
                values.append(body['password'].strip())
            
            if 'name' in body and body['name'].strip():
                update_fields.append('name = %s')
                values.append(body['name'].strip())
            
            if 'discount_percent' in body:
                update_fields.append('discount_percent = %s')
                values.append(body['discount_percent'])
            
            if 'is_active' in body:
                update_fields.append('is_active = %s')
                values.append(body['is_active'])
            
            update_fields.append('updated_at = CURRENT_TIMESTAMP')
            
            if not update_fields:
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'No fields to update'}),
                    'isBase64Encoded': False
                }
            
            values.append(partner_id)
            query = f"UPDATE partners SET {', '.join(update_fields)} WHERE id = %s"
            
            cursor.execute(query, values)
            conn.commit()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Partner updated'}),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters') or {}
            partner_id = query_params.get('id')
            
            if not partner_id:
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Partner ID is required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute('DELETE FROM partners WHERE id = %s', (partner_id,))
            conn.commit()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Partner deleted'}),
                'isBase64Encoded': False
            }
        
        else:
            conn.close()
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        conn.close()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }