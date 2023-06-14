import traceback
import json

def handler(event, context):
    if event.get('type') == 'routine':
        return routines[event['routine']].handler({
            'cron': event['cron'],
        })
    else:
        try:
            return {
                'statusCode': 200,
                'body': json.dumps(endpoints[event['resource']][event['httpMethod']].handler({
                    'resource': event['resource'],
                    'path': event['path'],
                    'method': event['httpMethod'],
                    'headers': event['headers'],
                    'queryParameters': event['queryStringParameters'],
                    'pathParameters': event['pathParameters'],
                    'body': event['body'] if event['body'] != None else '',
                }))
            }
        except:
            return {
                'statusCode': 500,
                'body': traceback.format_exc()
            }