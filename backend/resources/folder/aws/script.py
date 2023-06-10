import folder.s3fs as s3fs

s3 = s3fs.S3FileSystem()

class Module:
    def open(self, path: str, mode: str):
        path = '${id}' + '/' + path
        path = path.replace('//', '/')
        return s3.open(path, mode)
    def url(self, path: str, expiration: int = 3600):
        path = '${id}' + '/' + path
        path = path.replace('//', '/')
        return s3.url(path, expiration)
    def list(self, path: str = ''):
        path = '${id}' + '/' + path
        path = path.replace('//', '/')
        return s3.ls(path)