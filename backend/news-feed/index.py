import json
import feedparser
from datetime import datetime
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Получение последних новостей из RSS-фидов web.dev и SitePoint
    Args: event с httpMethod (GET/OPTIONS)
    Returns: JSON с массивом новостей
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
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    feeds = [
        {
            'url': 'https://web.dev/feed.xml',
            'source': 'web.dev',
            'sourceUrl': 'https://web.dev/'
        },
        {
            'url': 'https://www.sitepoint.com/feed/',
            'source': 'SitePoint',
            'sourceUrl': 'https://www.sitepoint.com/'
        }
    ]
    
    all_news: List[Dict[str, Any]] = []
    
    for feed_info in feeds:
        feed = feedparser.parse(feed_info['url'])
        
        for entry in feed.entries[:5]:
            category = 'Web Development'
            if hasattr(entry, 'tags') and entry.tags:
                category = entry.tags[0].term if entry.tags[0].term else 'Web Development'
            
            published = entry.published if hasattr(entry, 'published') else ''
            try:
                date_obj = datetime.strptime(published, '%a, %d %b %Y %H:%M:%S %Z')
                formatted_date = date_obj.strftime('%d %B %Y')
            except:
                formatted_date = published
            
            news_item = {
                'title': entry.title,
                'excerpt': entry.summary[:150] + '...' if len(entry.summary) > 150 else entry.summary,
                'content': entry.summary,
                'source': feed_info['source'],
                'sourceUrl': feed_info['sourceUrl'],
                'date': formatted_date,
                'category': category,
                'link': entry.link,
                'image': entry.media_content[0]['url'] if hasattr(entry, 'media_content') and entry.media_content else 'https://cdn.poehali.dev/files/5e53ea79-1c81-4c3f-847b-e8a82a5743c2.png'
            }
            all_news.append(news_item)
    
    all_news = sorted(all_news, key=lambda x: x['date'], reverse=True)[:5]
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'news': all_news})
    }
