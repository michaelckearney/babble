# Babble

Babble is a lightweight desktop application for creating and managing fully serverless microservices on AWS.  Babble is designed to be used by developers of all skill levels, from beginners to experts. The only programming language you need to know is Python.  Babble uses a lightweight YAML-based framework that drastically improves the size and readability of your codebase while reducing the learning curve for backend development.  Its responsive user interface with integrated code editors improve the efficiency of your development process.

<img src="https://michaelckearney.s3.amazonaws.com/assets/images/homepage_screenshot.jpeg" width="100%">

# How it Works

When you open Babble, you can navigate to any folder of your choosing.  You can then create a new service or import an existing service file.  A service is a collection of resources that are deployed together as a single unit, defined in a single YAML file.  These resources include packages, folders, tables, libraries, scripts, routines, and endpoints.  Babble's intuitive user interface makes it simple to create and manage complex services and resources.  When you activate a service, the Babble interpreter will translate your simple YAML declarations into complex Terraform configurations to provision the AWS infrastructure necessary to run your service.  This includes provisioning all of the necessary AWS resources and generating the Python code that integrates them into your Lambda Function.  This makes Babble a great option for developers who want to focus on writing code and not worry about the underlying infrastructure.  Babble comes with Terraform pre-installed so you don't even need to open the Command Line.

# Resources

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/1235241c094423e14f3bbf4c662c491ad9f998c1/backend/resources/package/icon.svg">&ensp;Package</span>
Packages are how we add third-party Python packages to our service using the Python Package Index. When you activate a service, a separate Lambda Function will be created and invoked once to install your specified packages and create a Lambda Layer containing these packages.  This Layer will be attached to your Lambda Function and all necessary imports will be automatically generated.
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
<br /><br />

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/folder/icon.svg">&ensp;Folder</span>
Folders are used to read and write files using cloud-based serverless object storage.  When deployed, this will be used to create an S3 bucket with which you can read files, write files, and generate temporary file URLs.  The necessary client code will be added to the Lambda function and all necessary imports will be automatically generated.
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
Tables are used for the storage and retrieval of data using cloud-based serverless key-value databases.  When deployed, this will be used to create a DynamoDB table in which you can create, read, update, and delete data.  The necessary client code will be added to the Lambda function and all necessary imports will be automatically generated.
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
Libraries allow us to import modules from the Python Standard Library.  These are intended to be used instead of import statements to prevent naming conflicts and further reduce the size of your codebase.  The libraries you define will be accessible from your scripts, routines, and endpoints.
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
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/library_example.jpeg" width="100%">
    </ul>
</details>
<br />

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/script/icon.svg">&ensp;Script</span>
Scripts allow you to define functions and classes that can be referenced from your endpoints, routines, and other scripts.  The code you write will be added to your Lambda Function and all necessary imports will be automatically generated.
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
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/script_example1.jpeg" width="100%">
    </ul>
    <ul>
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/script_example2.jpeg" width="100%">
    </ul>
    <ul>
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/script_example3.jpeg" width="100%">
    </ul>
</details>
<br />

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/routine/icon.svg">&ensp;Routine</span>
Routines are used to repeat a set of instructions at a specified interval. The interval is specified using a cron-formatted line of text.  When deployed, this will be used to create an EventBridge Rule, formerly known as CloudWatch Events, that will invoke your Lambda Function at the specified interval.  The necessary client code will be added to the Lambda function and all necessary imports will be automatically generated.
<details>
    <summary>
        <b>Settings</b>
    </summary>
    <ul>
        <b>name</b> - The name that can be used to reference the routine from your code.
    </ul>
    <ul>
        <b>cron</b> - A cron-formatted line of text that specifies the schedule on which your routine will be invoked.  For help generating cron statements, go <a href="http://www.cronmaker.com/?1">here</a>. 
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
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/routine_example.jpeg" width="100%">
    </ul>
</details>
<br />

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/endpoint/icon.svg">&ensp;Endpoint</span>
Endpoints are used to define the API Gateway endpoints that will be used to invoke your Lambda Function.  When deployed, this will be used to create an API Gateway REST API with the specified endpoints.  The necessary client code will be added to the Lambda function and all necessary imports will be automatically generated.
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
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/endpoint_example1.jpeg" width="100%">
    </ul>
    <ul>
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/endpoint_example2.jpeg" width="100%">
    </ul>
</details>
<br/>