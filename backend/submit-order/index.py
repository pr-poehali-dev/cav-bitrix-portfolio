import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any, List


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Обработка заявок с калькулятора услуг и отправка в Битрикс24 + Telegram
    Args: event с httpMethod, body (JSON с полями: total, services, isPartner, discount)
          context с request_id
    Returns: HTTP response с результатом отправки
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
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    total: float = body_data.get('total', 0)
    services: List[str] = body_data.get('services', [])
    is_partner: bool = body_data.get('isPartner', False)
    discount: int = body_data.get('discount', 0)
    contact_name: str = body_data.get('name', 'Не указано')
    contact_phone: str = body_data.get('phone', 'Не указано')
    contact_email: str = body_data.get('email', 'Не указано')
    
    bitrix_webhook = 'https://itpood.ru/rest/1/ben0wm7xdr8zsore/'
    
    services_text = '\n'.join([f'• {service}' for service in services])
    
    partner_info = f'\n🎯 Партнёрская скидка: {discount}%' if is_partner else ''
    
    bitrix_data = {
        'TITLE': f'Заявка на {total} ₽',
        'NAME': contact_name,
        'PHONE': [{'VALUE': contact_phone, 'VALUE_TYPE': 'WORK'}],
        'EMAIL': [{'VALUE': contact_email, 'VALUE_TYPE': 'WORK'}],
        'COMMENTS': f'💰 Сумма: {total} ₽{partner_info}\n\n📋 Услуги:\n{services_text}',
        'SOURCE_ID': 'WEB'
    }
    
    bitrix_success = False
    try:
        bitrix_url = f'{bitrix_webhook}crm.lead.add.json'
        bitrix_request = urllib.request.Request(
            bitrix_url,
            data=json.dumps({'fields': bitrix_data}).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(bitrix_request, timeout=10) as response:
            bitrix_result = json.loads(response.read().decode('utf-8'))
            bitrix_success = bitrix_result.get('result', False)
    except Exception as e:
        print(f'Bitrix24 error: {str(e)}')
    
    telegram_success = False
    telegram_bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
    
    if telegram_bot_token and telegram_chat_id:
        try:
            telegram_message = f'''
🆕 Новая заявка с сайта

💰 Сумма: {total} ₽{partner_info}

👤 Контакты:
• Имя: {contact_name}
• Телефон: {contact_phone}
• Email: {contact_email}

📋 Услуги:
{services_text}
'''
            
            telegram_url = f'https://api.telegram.org/bot{telegram_bot_token}/sendMessage'
            telegram_data = {
                'chat_id': telegram_chat_id,
                'text': telegram_message,
                'parse_mode': 'HTML'
            }
            
            telegram_request = urllib.request.Request(
                telegram_url,
                data=json.dumps(telegram_data).encode('utf-8'),
                headers={'Content-Type': 'application/json'}
            )
            
            with urllib.request.urlopen(telegram_request, timeout=10) as response:
                telegram_result = json.loads(response.read().decode('utf-8'))
                telegram_success = telegram_result.get('ok', False)
        except Exception as e:
            print(f'Telegram error: {str(e)}')
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'bitrix24': bitrix_success,
            'telegram': telegram_success,
            'message': 'Заявка обработана'
        })
    }
