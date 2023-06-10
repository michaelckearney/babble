import traceback
import json

def handler(event, context):
    e = {
        'resource': event['resource'],
        'path': event['path'],
        'method': event['httpMethod'],
        'headers': event['headers'],
        'queryParameters': event['queryStringParameters'],
        'pathParameters': event['pathParameters'],
        'body': event['body'] if event['body'] != None else '',
    }
    try:
        return {
            'statusCode': 200,
            'body': json.dumps(endpoints[event['resource']][event['httpMethod']].handler(e))
        }
    except:
        return {
            'statusCode': 500,
            'body': traceback.format_exc()
        }