let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {
    // Send post authentication data to Cloudwatch logs
    console.log("POST AUTH trigger - Authentication successful - event :" + JSON.stringify(event));
    console.log("Trigger function =", event.triggerSource);
    console.log("User pool = ", event.userPoolId);
    console.log("App client ID = ", event.callerContext.clientId);
    console.log("User ID = ", event.userName);

    console.log(" fetching data from DB");
    ddb.get({
        TableName: 'CognitoUser',
        Key: { 'userId': 'rahulmittal' }
    }).promise()
        .then((data) => {
            console.log('data :' + JSON.stringify(data));
        })
        .catch((err) => {
             console.log("ERROR : " + JSON.stringify(err));
        });


    // Return to Amazon Cognito
    callback(null, event);
}