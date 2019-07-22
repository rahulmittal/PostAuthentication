let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {
    // Send post authentication data to Cloudwatch logs
    console.log("POST AUTH trigger - Authentication successful - event :" + JSON.stringify(event));
    if (event.request.userAttributes.sub) {
        var user = event.request.userAttributes.sub;
        console.log("put data for user" + user);
        ddb.put({
            TableName: 'CognitoUser',
            Item: {
                'loginCount': 0,
                'userId': user
            }
        }).promise().then((data) => {
            console.log('PUT data :' + JSON.stringify(data));
			console.log("calling context done! - success");
			context.done(null, event);	            
        }).catch((err) => {
            console.log("ERROR while put: " + JSON.stringify(err));
			console.log("calling context done! - error");
			context.done(JSON.stringify(err));            
        });
    }else{
        console.error("USer Not found for event : " + JSON.stringify(event));
        callback(null, event);
    }
}