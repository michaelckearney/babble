<head>
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,0,0" />
</head>
# Babble

Babble is a lightweight desktop application for creating and managing fully serverless microservices on AWS. The only programming language you need to know is Python.  Babble uses a lightweight YAML-based framework that drastically improves the size and readability of your codebase while reducing the learning curve for cloud-based microservices development.  

## Resources


### <span class="material-symbols-outlined">inventory_2</span>&ensp;&ensp;<span>Package</span>
Packages are used to install Python packages from pip. When deployed, this will be used to create a Lambda Layer that contains the specified dependencies.
<details>
    <summary>
        <b>Settings</b>
    </summary>
    <ul style="margin-top:0.5em">
        <b>requirements</b> - a list of packages to install from pip, following the <a href="https://pip.pypa.io/en/stable/reference/requirements-file-format/">requirements.txt</a> format
    </ul>
</details>
<details>
    <summary>
        <b>Example</b>
    </summary>
    <ul style="margin-top:0.5em">
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/package_example1.jpeg" width="100%">
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/package_example2.jpeg" width="100%">
    </ul>
</details>

### <span class="material-symbols-outlined">folder</span>&ensp;&ensp;<span>Folder</span>
Folders are used to read and write files using cloud-based object storage.  When deployed, this will be used to create an S3 bucket.
<details>
    <summary>
        <b>Example</b>
    </summary>
    <ul style="margin-top:0.5em">
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/folder_example.jpeg" width="100%">
    </ul>
</details>

### <span class="material-symbols-outlined">table_chart</span>&ensp;&ensp;<span>Table</span>
Tables are used for the storage and retrieval of data entries using cloud-based NoSQL databases.  When deployed, this will be used to create a DynamoDB table.
<details>
    <summary>
        <b>Settings</b>
    </summary>
    <ul style="margin-top:0.5em">
        <b>key</b> - name of the item attribute used as the primary key to uniquely identify items in the table
    </ul>
</details>
<details>
    <summary>
        <b>Example</b>
    </summary>
    <ul style="margin-top:0.5em">
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/table_example.jpeg" width="100%">
    </ul>
</details>


### <span class="material-symbols-outlined">library_books</span>&ensp;&ensp;<span>Library</span>
Libraries are used to import modules from the Python Standard Library, as opposed to importing them in your code.  This exists to 
<details>
    <summary>
        <b>Settings</b>
    </summary>
    <ul style="margin-top:0.5em">
        <b>import</b> - what will be imported
    </ul>
</details>
<details>
    <summary>
        <b>Example</b>
    </summary>
    <ul style="margin-top:0.5em">
        <!-- <img src="https://michaelckearney.s3.amazonaws.com/assets/images/table_example.jpeg" width="100%"> -->
    </ul>
</details>


### <span class="material-symbols-outlined">description</span>&ensp;&ensp;<span>Script</span>
<details>
    <summary>
        <b>Settings</b>
    </summary>
    <ul style="margin-top:0.5em">
        <b>setting</b> - description
    </ul>
</details>
<details>
    <summary>
        <b>Example</b>
    </summary>
    <ul style="margin-top:0.5em">
        <!-- <img src="url" width="100%"> -->
    </ul>
</details>


### <span class="material-symbols-outlined">calendar_month</span>&ensp;&ensp;<span>Routine</span>
<details>
    <summary>
        <b>Settings</b>
    </summary>
    <ul style="margin-top:0.5em">
        <b>setting</b> - description
    </ul>
</details>
<details>
    <summary>
        <b>Example</b>
    </summary>
    <ul style="margin-top:0.5em">
        <!-- <img src="url" width="100%"> -->
    </ul>
</details>


### <span class="material-symbols-outlined">cloud</span>&ensp;&ensp;<span>Endpoint</span>
<details>
    <summary>
        <b>Settings</b>
    </summary>
    <ul style="margin-top:0.5em">
        <b>setting</b> - description
    </ul>
</details>
<details>
    <summary>
        <b>Example</b>
    </summary>
    <ul style="margin-top:0.5em">
        <!-- <img src="url" width="100%"> -->
    </ul>
</details>
