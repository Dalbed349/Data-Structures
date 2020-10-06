# Weekly Assignment 5
Use Amazon Web Services to create a table in [Amazon DynamoDB](https://aws.amazon.com/dynamodb/), a NoSQL database service.

# Files
README.md
wa05a.js
DynamoDBplan.png

## Step 1: Create some data for a table in DynamoDB database. 
1.	Working from the design found in DynamoDBplan.png, a javascript class item is created with relevant containers. 
2.	 The following code establishes the structure for the blog entries that will be entered into the table. 
```
var AWS = require('aws-sdk');
var async = require('async');  

var blogEntries = [];

class BlogEntry {
  constructor(primaryKey, date, entry, topicOfTheDay, sleepHours, buyCoffee, makeCoffee, ) {
    this.pk = {};
    this.pk.N = primaryKey.toString();
    this.date = {}; 
    this.date.S = new Date(date).toDateString();
    this.entry = {};
    this.entry.S = entry;
     this.topicOfTheDay = {};
    this.topicOfTheDay.S = topicOfTheDay.toString();
    this.sleepHours = {};
    this.sleepHours.N = sleepHours.toString();;
    if (buyCoffee != null) {
      this.buyCoffee = {};
      this.buyCoffee.N = buyCoffee.toString();; 
    }
     if (makeCoffee != null) {
      this.makeCoffee = {};
      this.makeCoffee.N = makeCoffee.toString();; 
    }
    // this.time = {};
    // this.time.N = new Date(date).getHours().toString();
  }

}
```

3. New blog entries with class 'BlogEntry' are pushed to array blogEntries = []. 
```
blogEntries.push(new BlogEntry(1,'October 4 2020 13:45:30.11', "Todddddday I learned how to put data into a database",["aws-sdk, async each series"], 8, 1, 2));

blogEntries.push(new BlogEntry(2,'October 5 2020 13:45:30.11', "Something new",["p5js, gravity"], 7, 2,0 ));

blogEntries.push(new BlogEntry(3,'October 2 2020 15:00:00', "Today I went to office hours",["git merge conflicts, git io image load problems"], 11, 3, 3));

```


## Step 2: Populate database.
1. install / require the following:
	```var AWS = require('aws-sdk'); var async = require('async');```
2. connect to DynamoDB with the following code and use putItem asynchronously.  
3. variable i is used to make sure that the index of each blogEntries[i] is added with each execution of the async action. 

```AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

 var params = {};
 var i =0-1;
 
async.eachSeries(blogEntries, function(value, callback) {
  
    i++;
     params.TableName = "processblog";
    params.Item = blogEntries[i]; 
    
    
  dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
    setTimeout(callback, 1000); 
    
}); 
```


