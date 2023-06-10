import boto3
import os
import shutil
import zipfile

s3 = boto3.client('s3')

def start(context, message):
    print(message)
    return context.get_remaining_time_in_millis()
def stop(context, timer):
    result = (timer - context.get_remaining_time_in_millis()) / 1000
    print('time: ' + str(result))

def handler(event, context):

    if not os.path.exists('/tmp/layer.zip'):
        try:
            timer = start(context, 'downloading from s3...')
            s3.download_file(event['bucket'], event['key'], '/tmp/layer.zip')
            stop(context, timer)
            timer = start(context, 'unzipping...')
            with zipfile.ZipFile('/tmp/layer.zip', 'r') as zip_ref:
                zip_ref.extractall('/tmp/packages')
            stop(context, timer)
        except:
            os.makedirs('/tmp/packages/python', exist_ok=True)
            with open('/tmp/packages/python/__init__.py', 'w') as f:
                f.write('')
            with open('/tmp/packages/python/placeholder.txt', 'w') as f:
                f.write('This is not an empty zip file.')
    os.chdir('/tmp/packages/python')
    for name, requirements in {**event['packages'], **event['modules']}.items():
        if os.path.exists(f'/tmp/packages/python/{name}/requirements.txt'):
            with open(f'/tmp/packages/python/{name}/requirements.txt') as f:
                if f.read().strip() == requirements:
                    continue
        else:
            os.makedirs(f'/tmp/packages/python/{name}', exist_ok=True)
        with open(f'/tmp/packages/python/{name}/__init__.py', 'w') as f:
            pass
        timer = start(context, 'installing packages...')
        os.makedirs(f'/tmp/packages/python/{name}', exist_ok=True)
        with open(f'/tmp/packages/python/{name}/requirements.txt', 'w') as f:
            f.write(requirements)
        os.system(f'pip3 install -r {name}/requirements.txt -t {name}')
        stop(context, timer)

    timer = start(context, 'zipping...')
    shutil.make_archive('/tmp/layer', 'zip', '/tmp/packages')
    stop(context, timer)
    timer = start(context, 'uploading to s3...')
    s3.upload_file('/tmp/layer.zip', event['bucket'], event['key'])
    stop(context, timer)
    
    imports = []
    for name in event['packages'].keys():
        for dir in os.listdir(f'/tmp/packages/python/{name}'):
            if os.path.exists(f'/tmp/packages/python/{name}/{dir}/top_level.txt'):
                with open(f'/tmp/packages/python/{name}/{dir}/top_level.txt') as f:
                    for line in f.readlines():
                        imports.append(f'import {name}.{line.strip()}')
                        
    return '\n'.join(imports)