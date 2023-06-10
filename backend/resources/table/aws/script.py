import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('${id}')

def remove_decimal(item):
    if isinstance(item, dict):
        for k in item.keys():
            item[k] = remove_decimal(item[k])
        return item
    elif isinstance(item, list):
        for i in range(len(item)):
            item[i] = remove_decimal(item[i])
        return item
    elif isinstance(item, Decimal):
        if '.' in str(item):
            return float(item)
        else:
            return int(item)
    else:
        return item

class Module:
    def __init__(self):
        self.key = '${key}'
    def __getitem__(self, key):
        if isinstance(key, str):
            return remove_decimal(table.get_item(
                Key = {
                    '${key}': key
                }
            ).get('Item', {}))
        elif isinstance(key, dict):
            return remove_decimal(
                table.scan(
                    FilterExpression = ' AND '.join([f'#{k} = :{k}' for k in key.keys()]),
                    ExpressionAttributeNames = {f'#{k}': k for k in key.keys()},
                    ExpressionAttributeValues = {f':{k}': v for k, v in key.items()}
                )
            ).get('Items', [])
    def __setitem__(self, key, item: dict) -> dict:
        item['${key}'] = key
        table.put_item(
            Item = item
        )
        return item
    def __delitem__(self, key: str) -> None:
        table.delete_item(
            Key = {
                '${key}': key
            }
        )