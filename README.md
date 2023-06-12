# Babble

Babble is a lightweight desktop application for creating and managing fully serverless microservices on AWS. The only programming language you need to know is Python.  Babble uses a lightweight YAML-based framework that drastically improves the size and readability of your codebase while reducing the learning curve for cloud-based microservices development.  

# Resources

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/1235241c094423e14f3bbf4c662c491ad9f998c1/backend/resources/package/icon.svg">&ensp;Package</span>
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

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/folder/icon.svg">&ensp;Folder</span>
Folders are used to read and write files using cloud-based object storage.  When deployed, this will be used to create an S3 bucket.
<details>
    <summary>
        <b>Example</b>
    </summary>
    <ul style="margin-top:0.5em">
        <img src="https://michaelckearney.s3.amazonaws.com/assets/images/folder_example.jpeg" width="100%">
    </ul>
</details>

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/table/icon.svg">&ensp;Table</span>
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

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/library/icon.svg">&ensp;Library</span>
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

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/script/icon.svg">&ensp;Script</span>
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

## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/routine/icon.svg">&ensp;Routine</span>
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


## <span style="height:1em;display:inline-flex;text-align:left;align-items:center;"><img height="24px" width="24px" src="https://raw.githubusercontent.com/michaelckearney/babble/120dddb7417347121eaab9a046e14b1aa2c3fd2a/backend/resources/endpoint/icon.svg">&ensp; Endpoint</span>
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
