import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('${name}')

class Module:
    def get():
        pass
    def put():
        pass
    def delete():
        pass