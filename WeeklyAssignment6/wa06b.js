// npm install aws-sdk
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();
//:topicName and
var params = {
    TableName : "processblog",
    KeyConditionExpression: "pk = :thisPk", // the query expression
    // ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
    //     "#tp" : "sleepHours"
    // },
    
                                // #md = :thismode
                                 //"#md" : "mode"
                                //":thismode" : {S: "yoga"),
    
    
    ExpressionAttributeValues: { // the query values
        ":thisPk": {N:"1"}
        // ":minDate": {N: new Date("October 2, 2020").valueOf().toString()},
        // ":maxDate": {N: new Date("October 4, 2020").valueOf().toString()}
    }
};

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});