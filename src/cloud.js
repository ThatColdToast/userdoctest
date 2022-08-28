// function dropHandler(event)
// {
//     alert("Drop!")
// }

// Initialize the Amazon Cognito credentials provider
var bucketName = "userdoctest";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:fa629e4c-3790-4f18-9d43-92f73e8d36d6";

// AWS.config.region = bucketRegion;

// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: "us-east-1:fa629e4c-3790-4f18-9d43-92f73e8d36d6",
// });

// Initialize the Amazon Cognito credentials provider (one fun)
AWS.config.update({
    region: bucketRegion,

    // credentials: new AWS.CognitoIdentityCredentials({
    //     IdentityPoolId: IdentityPoolId,
    // }),
    
    accessKeyId: "AKIAT2IOJZMVXRGA7FVM",
    secretAccessKey: "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",
});

var s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: bucketName }
});

function listS3Objects()
{
    //console.log("Creds: ", AWS.config.credentials)

    s3.listObjectsV2({  }, function(err, data) {
        if (err) {
        console.log("Err: ", err, err.stack); // an error occurred
        console.log("Data: ", data);
        } else {
            console.log("Success Data: ", data);           // successful response
        }
    })

    // console.log("Request Sent",
    //     s3.listObjectsV2({  }, function(err, data) {
    //         if (err) {
    //         console.log("Err: ", err, err.stack); // an error occurred
    //         console.log("Data: ", data);
    //         } else {
    //             console.log("Success Data: ", data);           // successful response
    //         }
    //     })
    // );
}

async function uploadFile(fileHandle) {
    // console.log("Handle: ", fileHandle)
    //var files = document.getElementById("photoupload").fileHandle;

    // Catch non-files
    if (!fileHandle.type == 'file') {
        return alert("Please choose a file to upload.");
    }

    if (!fileHandle.length) {
        return alert("Please choose a file to upload.");
    }

    var file = fileHandle[0];
    
    var fileData = await file.getFile();

    var fileSuffix = file.name.split('.').pop();

    var fileName = "before";
    var fileNamePromise = $.getJSON("https://api.ipify.org?format=json", function (data) {
        fileName = new Hashes.MD5().hex(data.ip + Date.now() + file.name) + "." + fileSuffix;
    });

    await fileNamePromise;

    console.log("FileName: " + fileName);

    var fullFileKey = "input_dir/" + fileName;
    // var fullFileKey = fileName;

    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: "userdoctest",
            Key: fullFileKey,
            Body: fileData,
            Tagging: "userdoc"
        }
    });

    var promise = upload.promise();

    promise.then(
        function (data) {
            alert("Successfully uploaded photo.");
            //viewAlbum(albumName);
        },
        function (err) {
            console.log("Error: ", err);
            //return alert("There was an error uploading your photo: ", err.message);
        }
    );
}

function onSubmit()
{
    alert("Submit!")
}

// style="display:none"