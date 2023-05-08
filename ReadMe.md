Data Structures Fall 2020

--- Welcome to My Github Page ---

Assignments descriptions can be found in the README files of each folder. 


-- Weekly Assignment 1 : use Request to pull html and save into txt files. 


-- Weekly Assignment 2: Save meeting addresses of Alcoholics anonymous in a text file. 


-- Weekly Assignment 3: Create a JSON object with the addresses and Geo Coordinates for each meeting location. 

## App Demo: Final Assignments 1, 2, and 3

These assignments are located in app.js which can be run with Node.js. Final assignments 2 and 3 have supplementary files located in /templates/sensor.txt and /templates/pb.txt respectively. 

Using:

* [Node.js](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction) (in Cloud 9, for now. Deployment options covered later.)  
* [Express](https://expressjs.com/)  - In line 290 of app.js Express JS is uses to serve static files in the /public folder. 
* [Handlebars](https://handlebarsjs.com/)  

### Final Assignment 1: AA Map

Using: 

* A [mapbox account](https://account.mapbox.com/)  
* [Leaflet](https://leafletjs.com/examples/quick-start/)  
* [Moment](https://momentjs.com/timezone/docs/) (for working with Time Zones)


Process: 
1. AA Map project draws on work from weekly assignments 1, 2, 3, 4, 6, and 7. By weekly assignment 7 an SQL database was prepared with data for every Manhattan Alcoholics Anonymous meeting. This included geolocations for the meetings.
2. Lines 1-23 load dependencies, configure the file path for the .env folder, and connect to the AWS RDS database. 
```var express = require('express'), 
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');
const moment = require('moment-timezone');
const handlebars = require('handlebars');
var fs = require('fs');
const dotenv = require('dotenv');
```
```
var db_credentials = new Object();
db_credentials.user = process.env.AWSRDS_UN;
db_credentials.host = process.env.AWSRDS_HT; 
db_credentials.database = process.env.AWSRDS_DB;
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;
```
3. In line 25 a function is written to convert numeric values of days (0=sunday, 6 = saturday) to string values as they are stored in the database. 
```
function convertDay(d){
    if (d == 0){
    return 'Sundays'
    }
     else if (d == 1){
    return 'Mondays'
    } 
    etc.....
   ```
   4. Since the output of this code will be an HTML page, two variables. hx (line 57) and jx (line 79) are created to hold the HTML properties for the page. IMPORTANT to note that in line 76 var data is left intentionally blank. This will be filled with the results of the RDS query later on. 
   ```
  <script>
  
  var data = 
  `;                   //(end of var hx)
  
var jx = `;
```
4. In var jx the parameters for a Mapbox input are set. An api accessToken is provided in order to return a map of manhattan. 
5. In lines 90-93 the markers for each meeting location are assigned values from the data. In this case markers will be placed at each latitude and longitude combination for the meetings. Since the geocoordinate were stored in a single string variable 'geocoords' it was necessary to split this string into a new array called cleanCoords. The first index is the latitude and second is longitude. This will be addressed further below. 
``` 
L.marker( [data[i].cleanCoords[1], data[i].cleanCoords[2]] )
```
Tooltip markers were added to display relevant data. 
```
.bindPopup('<strong>' + data[i].meeting_name + '</strong><br/><p>' + data[i].details + '</p>').addTo(mymap);
```
6. In the final part of var jx HTML a dropdown menu is added with 7 values (0-6). The idea was to use this dropdown menu to change the displayed meetings by altering the data base query according to the day selected. This part is still a work in progress. 
```
  <select id="MeetingDays" name="Days">
  <option value="0">Sundays</option>
  <option value="1">Mondays</option>
  <option value="2">Tuesdays</option>
  <option value="3">Wednesdays</option>
  <option value="4">Thursdays</option>
  <option value="5">Fridays</option>
  <option value="6">Saturdays</option>
</select>
```
7. In line 120 a .get method is used to respond to requests for the AA map data. Moment.js is used to get the current day and time so that meetings are shown based on the current day. 
```
app.get('/aa', function(req, res) {
   
    var now = moment.tz(Date.now(), "America/New_York"); 
    var dayy = now.day().toString(); 
    var hourr = now.hour().toString(); 
```
8. In line 128 a connection is established to the AWS RDS database. And in line 143 a query is made using SQL. Here all data is selected from the table aalocations where the weekday is equal to the current day. weekday was the name of the column in the database and the convertDay function (mentioned above) is used to turn the moment.js number output to match the entries in the database. 
```
const client = new Pool(db_credentials);
var thisQuery =  `SELECT address, geocoord, building_name, secondary_address,meeting_name,details,meeting_code,meeting_typename,weekday,starttime,endtime,special_interest
         FROM aalocations
         WHERE weekday = '` + convertDay(dayy) + "' ;" 
```
9. Finally, in line 173 a function is run to return all the rows of the database that match our query. The output is placed between the hx and jx variables so that the rows fill the data variable. A function is used forEach row of the output to split the geocoord string data with a regular expression. This transformed geoocords from (41,41) format to a new array ['',41,42,'']. This way the latitude could be accessed by cleanCoords[1] and the longitude by cleanCoords[2].
```
 client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
        
        else {
           
            qres.rows.forEach(d => {    // get each item in array by variable d 
                d.cleanCoords = d.geocoord.split(/\(|,|\)/) 
            })
   
             console.log(qres.rows)
            var resp = hx + JSON.stringify(qres.rows) + jx;
            res.send(resp);
            client.end();
            console.log('2) responded to request for aa meeting data');
            console.log(dayy);
            //console.log(e)
            
        }
    });
``` 

![](/FinalAssignments1,2,3/final_app_demo/FinalAssignment1.JPG)

### Final Assignment 2: Sensor Data

Using: 

* [D3.js (version 3)](https://github.com/d3/d3-3.x-api-reference/blob/master/API-Reference.md)
* [Handlebars](https://handlebarsjs.com/) (for [templating](https://github.com/visualizedata/data-structures/blob/master/final_code_demo/templates/sensor.txt))


Process: 
1. Similar to Final Assignment 1, a .get method was used so that requests to /temperature would access the sensorData table in the AWS RDS Postgress database. 
``` 
app.get('/temperature', function(req, res) {
    const client = new Pool(db_credentials);
```
2.  An SQL query was made to extract necessary values. For this assignment I wanted to plot the number of occurrences for each unique temperature reading. This meant that the query needed select the  sensorValue and COUNT the number of occurrences. In order to deal with extreme values beyond acceptable range a WHERE statement was introduced. The data points were grouped and ordered by value. 

```
    // SQL query 
var q = `SELECT sensorValue,
        COUNT (*) as num_obs
        FROM sensorData 
        WHERE (sensorValue > 70 AND sensorValue < 90)
        GROUP BY sensorValue
        ORDER BY sensorValue;`;

        client.connect();
    client.query(q, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.end(template({ sensordata: JSON.stringify(qres.rows)}));
            console.log(template({ sensordata: JSON.stringify(qres.rows)}))
            client.end();
            console.log('1) responded to request for sensor graph');
        }
    });
}); 

```
3. The response from this query was stringified and read to a handlebars template as sensordata. In /templates/sensor.txt D3 was used to visualize the query. On line 63 of this file data was set to equal sensordata. This is dynamic and will always update as the database is updated with new sensor data. 
4. For the final bar chart visualization, temperature reading values are placed along the x axis and their count is placed along the y axis. 
![](/FinalAssignments1,2,3/final_app_demo/SensorFinal.JPG) 

### Final Assignment 3: Process Blog

Using: 

* [JQuery](https://jquery.com/)  
* [Handlebars](https://handlebarsjs.com/) for the [template](https://github.com/visualizedata/data-structures/blob/master/final_code_demo/templates/pb.txt)  
* [AWS SDK for JavaScript](https://aws.amazon.com/sdk-for-node-js/)  

Process: 

1.  A .get method was used to set up connections to /processblog. Project 3 used AWS DynamoDB rather than AWS RDS so a new connection was set up. 
```
app.get('/processblog', function(req, res) {
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();
```
2. In line 261 the table name and key condition (query) expression was established. For the purposes of this assignment a primary key was used to sort the data. 
```
var params = {
    TableName : "processblog",
    KeyConditionExpression: "pk = :thisPk",
```
3. In line 269 the query values were established. This would be the particular numeric value of the primary key to be returned. In this case a Primary Key value of 1 is set for the request. 
```
ExpressionAttributeValues: { // the query values
        ":thisPk": {N:"1"}
    }
};
```
4. Line 277 sets up the query function for the dynamodb and passes the params var from line 261. The JSON response is stringified and stored in a variable called pbdata. pbdata is passed to line 18 of the /public/pb.txt file and used to generate a simple HTML table. In the future this could be styled better and passed to visualization libraries such as D3 JS.
5. Issues that still remain are trying to return more than one entry listed with the same primary key. This is an issue with how the database was constructed earlier in the semester and would be done differently in the future.

![](/FinalAssignments1,2,3/final_app_demo/FinalAssignment3.JPG)

```
    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            throw (err);
        }
        else {
            res.end(pbtemplate({ pbdata: JSON.stringify(data.Items)}));
            console.log('3) responded to request for process blog data');
        }
    });
});
```

