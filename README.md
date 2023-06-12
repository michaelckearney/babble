# Babble

Babble is a lightweight desktop application for creating and managing fully serverless microservices on AWS. The only programming language you need to know is Python.  Babble uses a lightweight YAML-based framework that drastically improves the size and readability of your codebase while reducing the learning curve for backend development.  

# Resources

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/1235241c094423e14f3bbf4c662c491ad9f998c1/backend/resources/package/icon.svg">&ensp;Package</span>
Packages are used to install Python packages from pip. When you activate a service, a  separate Lambda Function will be created and invoked once to install your specified packages, store them in S3, and create a Lambda Layer.  This Layer will be attached to your Lambda Function and all necessary imports will be automatically generated.
<details>
    <summary>
        <b>Settings</b>
    </summary>
    <ul>
        <b>name</b> - the name that can be used to reference the package from your code
    </ul>
    <ul>
        <b>requirements</b> - a list of packages to install from pip, following the <a href="https://pip.pypa.io/en/stable/reference/requirements-file-format/">requirements.txt</a> format
    </ul>
</details>
<details>
    <summary>
        <b>Example</b>
    </summary>
    <ul>
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/package_example1.jpeg" width="100%">
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/package_example2.jpeg" width="100%">
    </ul>
</details>
<br />

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/folder/icon.svg">&ensp;Folder</span>
Folders are used to read and write files using cloud-based object storage.  When deployed, this will be used to create an S3 bucket.  The necessary client code will be added to the Lambda function and all necessary imports will be automatically generated.  No need for connection strings or credentials.
<details>
    <summary>
        <b>Settings</b>
    </summary>
    <ul>
        <b>name</b> - the name that can be used to reference the folder from your code
    </ul>
</details>
<details>
    <summary>
        <b>Example</b>
    </summary>
    <ul>
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/folder_example.jpeg" width="100%">
    </ul>
</details>
<br />

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/table/icon.svg">&ensp;Table</span>
Tables are used for the storage and retrieval of data entries using cloud-based NoSQL databases.  When deployed, this will be used to create a DynamoDB table.  The necessary client code will be added to the Lambda function and all necessary imports will be automatically generated.  No need for connection strings or credentials.
<details>
    <summary>
        <b>Settings</b>
    </summary>
    <ul>
        <b>name</b> - the name that can be used to reference the table from your code
    </ul>
    <ul>
        <b>key</b> - name of the item attribute used as the primary key to uniquely identify items in the table
    </ul>
</details>
<details>
    <summary>
        <b>Example</b>
    </summary>
    <ul>
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/table_example.jpeg" width="100%">
    </ul>
</details>
<br />

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/library/icon.svg">&ensp;Library</span>
Libraries are used to import modules from the Python Standard Library, as opposed to adding import statements your code.  This exists to replace import statements and prevent naming conflicts between imported libraries and your resources.  The necessary imports will be automatically added to the Lambda Function source code.
<details>
    <summary>
        <b>Settings</b>
    </summary>
    <ul>
        <b>name</b> - the name that can be used to reference the library from your code
    </ul>
    <ul>
        <b>import</b> - the name of the library to import (translates to "import {import} as {name}")
    </ul>
</details>
<details>
    <summary>
        <b>Example</b>
    </summary>
    <ul>
        <!-- <img src="url" width="100%"> -->
    </ul>
</details>
<br />

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/script/icon.svg">&ensp;Script</span>
Scripts are where the bulk of your Python code will be.  It is recommended that you define your functions and classes here and reference them from your endpoints and routines.  This code will be automatically integrated into your Lambda Function.
<details>
    <summary>
        <b>Settings</b>
    </summary>
    <ul>
        <b>name</b> - The name that can be used to reference the script from your code.
    </ul>
    <ul>
        <b>content</b> - The Python source code of your script.  This will be automatically integrated into your Lambda Function.
    </ul>
</details>
<details>
    <summary>
        <b>Example</b>
    </summary>
    <ul>
        <!-- <img src="url" width="100%"> -->
    </ul>
</details>
<br />

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/routine/icon.svg">&ensp;Routine</span>
<details>
    <summary>
        <b>Settings</b>
    </summary>
    <ul>
        <b>name</b> - The name that can be used to reference the routine from your code.
    </ul>
    <ul>
        <b>schedule</b> - A cron-formatted line of text that specifies the schedule on which your routine will be invoked.  For help generating cron statements, go <a href="http://www.cronmaker.com/?1">here</a>. 
    </ul>
    <ul>
        <b>content</b> - The Python source code of your routine.  This will be automatically integrated into your Lambda Function.  It must contain the function "handler(event)" which will be invoked continuously according to your "schedule".  The "event" parameter is a Python dictionary variable structured as shown below:
    </ul>
    <ul>
        <pre>
            <code>
            {
                'cron': string containing your specified schedule
            }
            </code>
        </pre>
    </ul>
</details>
<details>
    <summary>
        <b>Example</b>
    </summary>
    <ul>
        <!-- <img src="url" width="100%"> -->
    </ul>
</details>
<br />

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/endpoint/icon.svg">&ensp;Endpoint</span>
<details>
    <summary>
        <b>Settings</b>
    </summary>
    <ul>
        <b>name</b> - The name that will be used to reference the endpoint from your code.
    </ul>
    <ul>
        <b>path</b> - The path that will be used to invoke your endpoint.  This will be appended to the base URL of your API.
    </ul>
    <ul>
        <b>method</b> - The HTTP method that will be used to invoke your endpoint.  This can be any of the following: "GET", "POST", "PUT", "DELETE".
    </ul>
    <ul>
        <b>content</b> - The Python source code of your endpoint.  This will be automatically integrated into your Lambda Function.  It must contain the function "handler(event)" which will be invoked when an API request is made that matches your specified "path" and "method".  The "event" parameter is a Python dictionary variable structured as shown below:
    </ul>
    <ul>
        <pre>
            <code>
            {
                'path': string containing the raw path of the API request (e.g. "/users/123")
                'method': string containing your specified method (e.g. "GET")
                'resource': string containing your specified path (e.g. "/users/{id}")
                'pathParameters': dictionary containing the path parameters of the API request (e.g. {'id': 123})
                'headers': dictionary containing the headers of the API request
                'queryStringParameters': dictionary containing the query string parameters of the API request
                'body': string containing the body of the API request
            }
            </code>
        </pre>
    </ul>
</details>
<details>
    <summary>
        <b>Example</b>
    </summary>
    <ul>
        <!-- <img src="url" width="100%"> -->
    </ul>
</details>
<br />