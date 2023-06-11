# Babble

Babble is a lightweight desktop application for creating and managing fully serverless microservices on AWS. The only programming language you need to know is Python.  Babble uses a lightweight YAML-based framework that drastically improves the size and readability of your codebase while reducing the learning curve for cloud-based microservices development.  

---
## Resources

---
#### Package
Packages are used to install Python packages from pip. When deployed, this will be used to create a Lambda Layer that contains the specified dependencies.
#### Settings
- requirements - a list of packages to install from pip, following the [requirements.txt format](https://pip.pypa.io/en/stable/reference/requirements-file-format/)
#### Example
<img src="https://michaelckearney.s3.amazonaws.com/assets/images/package_example1.jpeg" width="100%">
<img src="https://michaelckearney.s3.amazonaws.com/assets/images/package_example2.jpeg" width="100%">


### Folder
Folders are used to read and write files using cloud-based object storage.  When deployed, this will be used to create an S3 bucket.
#### Example


### Table
Tables are used for the storage and retrieval of data entries using cloud-based NoSQL databases.  When deployed, this will be used to create a DynamoDB table.
#### Settings
- key - name of the item attribute used as the primary key to uniquely identify items in the table
#### Example


### Library
Libraries are used to import modules from the Python Standard Library, as opposed to importing them in your code.  This exists to 
#### Settings
- import - what will be imported
#### Example


### Script
#### Settings
- content
#### Example


### Routine
#### Settings
- cron
- content
#### Example


### Endpoint
#### Settings
- path
- method
- content
#### Example
