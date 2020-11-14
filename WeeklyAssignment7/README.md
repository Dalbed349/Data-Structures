# Weekly Assignment 7
#### October 15th 2020 --- Re-do of documentation after catastrophic GitHub errors.

Relevant files:

1.  /CleaningScripts/CleanMapTESTLOOP.js --> READS from /data/ and puts cleaned data into CleaningScripts/test/
2.  /Geocodes/GeocodeTESTLOOP.js --> puts geocoded json into /Geocodes. ex: map1geo.json
3.  /Database/1CreateDB.js --> make the table
4.  /Database/2InsertIntoDB.js --> insert into table
5.  /Database/3CallDB.js --> test to see if data is in DB.

 #### Weekly Assignment 7 contains 3 parts:
 1. Parsing and Cleaning of 10 html pages containing Alcoholics Anonymous (A.A.) meeting information. 
 2. Geocoding of meeting locations parsed in part 1. 
 3. Creation, and population, of a PostgresSQL database with data retrieved in part 1 as well as geocoded locations from part 

### Part 1: Parsing and Cleaning of 10 html pages. 
The pages are located at the following URL: https://parsons.nyc/aa/m01.html 
Pages are found at m01-m10. 

File : /CleaningScripts/CleanMapTESTLOOP.js
#### Process
1.  load dependencies 
`` var fs = require('fs');
var cheerio = require('cheerio');``
Cheerio will be used for the cleaning of html data. 
2. The initial html data is saved in  the /data folder so a loop is created to access each of these files and load the content into a cheerio variable '$'. 
	``` for (let i = 1; i < 11; i++) {

    let filename = '../data/map' + i 
    var content = fs.readFileSync(filename + '.txt');

    // load `content` into a cheerio object
    var $ = cheerio.load(content);`` 

3. Cheerio is used to target the 'tr tr tr' header element and a .each function is run to extract relevant information from these files. Since the data is found in a table with two cells, the 'td's  (cell) are targeted one at a time. The result is stored in two objects that are created: Address (ln 27) and Meeting instance (ln 115). 
`` $('tr tr tr').each(function (i, outer_elem) {``
4. line 30 the first cell is targeted (cheerio .eq(0)) and a .each function is run to iterate through each of them. 
``  $(outer_elem).find('td').eq(0).each(function (i, elem) {``
5. line 34-43: a series of .split,  .trim, and regular expressions are used to consolidate the html into 'cleaned' data for the first cell. This includes the building name, street address, secondary address, meeting name, details, and wheelchair access for each meeting. 
6. line 54: This information is pushed to the aa.table array within the 'Address' object described in step 3. 
`` aa.table.push(Address)``
7. line 57: A second nested .each statement is used to target  (cheerio .eq(1)) the second cell of the table which contains additional data. 
``  $(outer_elem).find('td').eq(1).each(function (i, elem) {``
8. line 57-109: .split, .replace, .match are used to extract the meeting id, code, name, weekday, times, and special interests found in the second td. These are added as keys to the Meeting_Instance object mentioned in step 3 and created in line 115. 
9. Line 128: Meeting_Instance is pushed into an array called meetings_list  (created line 28) within the Address object. 
``Address.meetings_list.push(Meeting_Instance)``
10. The output was written to the test/ folder with fs.writeFileSync to create 10 json files with the following structure 
``{
"meetings_list": [
			{
			"meeting_id": 1,
			"typeCode": "OD",
			"typeName": "Open Discussion meeting",
			"weekDay": "Mondays",
			"startTime": "7:00",
			"startTime_amPm": "PM",
			"endTime": "8:00",
			"endTime_amPm": "PM",
			"interest": "AA Literature"
			}
],
"location_number": 73,
"building_name": "Most Holy Redeemer Church",
"street_address": "173 East 3rd Street- basement",
"secondary_address": "",
"meeting_name": "WORKS IN PROGRESS ",
"details": "Rotating Literature",
"wheelchair": null
}
``

### Part 2: Geocoding all locations from the 10 json files.  

File: /Geocodes/GeocodeTESTLOOP.js 

1. load dependencies 
```"use strict"
// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv');
```
2. Using tamu geo API to retrieve geolocations for addresses. 
IMPORTANT: Must set up .env file with API key. 
```
dotenv.config({path: '/home/ec2-user/environment/.env'});

const API_KEY = process.env.MY_SECRET;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx';
```
3. A for loop is used to access the cleaned data files from Part 1. 
```for (let i = 1; i < 11; i++) {
// geocode addresses
let meetingsData = [];
let filename = '../CleaningScripts/test/cleanedData' + i 
let aa = fs.readFileSync(filename+'.json');
//'/WeeklyAssignment7/CleaningScripts/test/'+ filename
```
4. Line 34: Using an async.eachSeries to construct the query and make requests to the api. 
```async.eachSeries(addresses, function(value, callback) {
    let query = {
        streetAddress: value.street_address,
        city: "New York",
        state: "NY",
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };
   ```
 5.  Establish apiRequest. Line 54 a new array called latlong is created. The tamugeo output of latitude and longitude are pushed into this array. A new object called tamuGeoFinal is created with key LatLong and StreetAddress. StreetAddress is set = to the input address and LatLong is set = to the latlong array with the geocoded outputs. These values are pushed into a meetingsData array.   : 
 ```let apiRequest = API_URL + '?' + querystring.stringify(query);

    request(apiRequest, function(err, resp, body) {
        if (err){ throw err; }

        let tamuGeo = JSON.parse(body);
            console.log(tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude']); //apiRequest); // TARGET WHAT U WANT
            
      
        let latlong = [];
       
        
        latlong.push(tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude']);
        latlong.push(tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude']);
        let tamuGeoFinal = new Object();
        tamuGeoFinal.StreetAddress = tamuGeo['InputAddress'];
        
        tamuGeoFinal.LatLong = latlong; 
        value.GeoCoord = latlong;
        
        meetingsData.push(value);
    });

    // sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
}, 
```
5. Finally, the geocoded data for the meetings files are written into new JSONs found in the /Geocodes folder. These will be parsed when inserting into DB for part 3.

   ``` function() {
    fs.writeFileSync(`map${i}geo.json`, JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
    console.log(meetingsData)
    ```


### Part 3: Create and Populate PostgresSQL database. 
File_a: /Database/1CreateDB.js <br/>
File_b: /Database/2InsertIntoDB.js <br/>
File_c:  /Database/3CallDB.js <br/>

1. Load dependencies, important = 'pg' 
``const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config({path: '../../.env'});
``
2. Aws RDS PostgreSQL database credentials 
```var db_credentials = new Object();
db_credentials.user = 'dalbed349';
db_credentials.host = 'data-structures-20.ckg3d7ssdboe.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();
```
3. The following code is used to create a table in the database. Currently all character limits are set to 1000 to avoid any potential trouble. They can be reduced later to optimize memory usage. 
```
var thisQuery = "CREATE TABLE aalocations (ID serial primary key, Address varchar(1000), GeoCoord varchar(1000), Building_name varchar(1000), Secondary_address varchar(1000), Meeting_name varchar(1000), Details varchar(1000), Wheelchair varchar(1500), Meeting_code varchar(1000), Meeting_typeName varchar(1000), WeekDay varchar(1000), StartTime varchar(1000), EndTime varchar(1000), Special_interest varchar(1000))"
// Sample SQL statement to delete a table: 
//var thisQuery = "DROP TABLE aalocations;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
```

4. INSERT INTO DB.  pg-escape VERY HELPFUL to avoid problematic characters such as apostrophes. 

``const { Client } = require('pg');
var async = require('async');  
const dotenv = require('dotenv');
const fs = require('fs');
var escape = require('pg-escape');``

5. For the insertion into DB an async.eachSeries within an async.eachSeries is used. The first async (line 21) goes through each of the geocoded files from part 2 to insert the location data (cell 1 from original html table) . The nested async goes through each of these locations and inserts the meetings that occur at these locations. INSERT INTO in conjunction with pg-escapes %L (for string type variable) is used. 
```
for (let i = 1; i<=10; i++){           // loop through files with multiple meetings

    let addressesForDb = JSON.parse(fs.readFileSync(`../Geocodes/map${i}geo.json`)); 

    async.eachSeries(addressesForDb, function(meeting, callback) { // loop through meetings 
    
    
       let meeting_list = meeting.meetings_list;
       
        async.eachSeries(meeting_list, function(slot, callback) {        //loop through each time slot for each meeting
            const client = new Client(db_credentials);
            client.connect();
            // var thisQuery = "INSERT INTO aalocations VALUES (E'" + meeting.street_address + "', '"+meeting.GeoCoord+ "', '" + meeting.building_name+ "', '" + meeting.secondary_address + "', '" + 
            //     meeting.meeting_name+ "', '" + meeting.details + "', '" + meeting.wheelchair+ "', '" +slot.typeCode+ "', '" + slot.weekDay+ "', '" +slot.startTime+slot.startTime_amPm+ "', '" +slot.endTime+slot.endTime_amPm+ "', '" +
            //     slot.interest+"');"; 
                
            var thisQuery = escape("INSERT INTO aalocations VALUES (DEFAULT, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L )",
            meeting.street_address,
            meeting.GeoCoord,
            meeting.building_name,
            meeting.secondary_address, 
            meeting.meeting_name,
            meeting.details,
            meeting.wheelchair,
            slot.typeCode,  
            slot.typeName,//Meeting_Instance.typeName = meetTypeCodeName;
            slot.weekDay,
            slot.startTime + slot.startTime_amPm,
            slot.endTime + slot.endTime_amPm,
            slot.interest); 

            console.log(thisQuery);
            client.query(thisQuery, (err, res) => {
                console.log(err, res);
             client.end();
            });
            setTimeout(callback, 1000); 
        }); 
      setTimeout(callback, 1000); 
   }) 
}
```
6. The final step is to check the database to see if the insertions have been successful. This is done in /Database/3CallDB.js. A simple query "SELECT * FROM aalocations;" is run to return all of the meeting locations and all of the meetings for each location. There are a total of 1206 unique meetings. 
``` 
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query the entire contents of a table: 
var thisQuery = "SELECT * FROM aalocations;";

client.query(thisQuery, (err, res) => {
    console.log(err, res.rows);
    client.end();
});
```