var express = require('express'), 
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');
const moment = require('moment-timezone');
const handlebars = require('handlebars');
var fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({path: '../../.env'});

const indexSource = fs.readFileSync("templates/sensor.txt").toString();
var template = handlebars.compile(indexSource, { strict: true });

const pbSource = fs.readFileSync("templates/pb.txt").toString();
var pbtemplate = handlebars.compile(pbSource, { strict: true });

// AWS RDS credentials
var db_credentials = new Object();
db_credentials.user = process.env.AWSRDS_UN;
db_credentials.host = process.env.AWSRDS_HT; 
db_credentials.database = process.env.AWSRDS_DB;
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

function convertDay(d){
    
    if (d == 0){
    return 'Sundays'
    }
     else if (d == 1){
    return 'Mondays'
    }
    else if (d == 2){
    return 'Tuesdays'
    }
    else if (d == 3){
    return 'Wednesdays'
    }
    else if (d == 4){
    return 'Thursdays'
    }
    else if (d == 5){
    return 'Fridays'
    }
    else if (d == 6){
    return 'Saturdays'
    }
}

// function setDay(e){
//     var e =  document.getElementById("MeetingDays");
//     console.log(e)
// }

console.log(process.env.AWSRDS_HT)
// create templates
var hx = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AA Meetings</title>
  <meta name="description" content="Meetings of AA in Manhattan">
  <meta name="author" content="AA">
  <link rel="stylesheet" href="css/styles.css?v=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
       integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
       crossorigin=""/>
</head>
<body>
<div id="mapid"></div>
<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
  <script>
  
  var data = 
  `;
  
var jx = `;
    var mymap = L.map('mapid').setView([40.734636,-73.994997], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    minZoom: 13,
    zoomOffset: -1,
    id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoiYWxiZWQzNDkiLCJhIjoiY2tmbHFtc3ZjMWd2dzMwcDd6N3JwcnRkZiJ9.MJoOk-AyuTwJtINHkIXjeA' 
    }).addTo(mymap);
    for (var i=0; i<data.length; i++) {
        
    
        L.marker( [data[i].cleanCoords[1], data[i].cleanCoords[2]] ).bindPopup('<strong>' + data[i].meeting_name + '</strong><br/><p>' + data[i].details + '</p>').addTo(mymap);
    }
    </script>
    <select id="MeetingDays" name="Days">
  <option value="0">Sundays</option>
  <option value="1">Mondays</option>
  <option value="2">Tuesdays</option>
  <option value="3">Wednesdays</option>
  <option value="4">Thursdays</option>
  <option value="5">Fridays</option>
  <option value="6">Saturdays</option>
</select>
var e =  document.getElementById("MeetingDays");

    </body>
    </html>`;
    
// removed from L.marker line JSON.stringify(bindPopup(data[i])) 
//L.marker ( [geocoord[i].split )
// line 59 is where split code occurs ***** 

app.get('/', function(req, res) {
    res.send('<h3>Data Structures Final Projects </h3><ul><li><a href="/aa">AA meeting locations map</a></li><li><a href="/temperature">The temperature in my room. Photon sensor data</a></li><li><a href="/processblog">Process blog from the semester</a></li></ul>');
}); 


// respond to requests for /aa
app.get('/aa', function(req, res) {
   
    var now = moment.tz(Date.now(), "America/New_York"); 
    var dayy = now.day().toString(); 
    var hourr = now.hour().toString(); 
    
    
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query 
 
    
    // var thisQuery = `SELECT lat, lon, json_agg(json_build_object('loc', mtglocation, 'address', mtgaddress, 'time', tim, 'name', mtgname, 'day', day, 'types', types, 'shour', shour)) as meetings
    //              FROM aalocations 
    //              WHERE day = ` + dayy + 'and shour >= ' + hourr + 
    //              
                //   var thisQuery = `SELECT lat, lon, json_agg(json_build_object('loc', mtglocation, 'address', mtgaddress, 'time', tim, 'name', mtgname, 'day', day, 'types', types, 'shour', shour)) as meetings
                //  FROM aalocations 
                //  WHERE day = ` + dayy + 'and shour >= ' + hourr + 
                //  `GROUP BY lat, lon
                // ;`;
                // insert json_agg below first in quote is name in obj and second in quotes in name in table 
var thisQuery =  `SELECT address, geocoord, building_name, secondary_address,meeting_name,details,meeting_code,meeting_typename,weekday,starttime,endtime,special_interest
         FROM aalocations
         WHERE weekday = '` + convertDay(dayy) + "' ;" 
         
         
        // `GROUP BY geocoord
        //           ;`;
                  
                  
                  
                  
        console.log(thisQuery);
         
  // + 'and shour >= ' + hourr + 
   // slice string - cut () split on comma ***************************************************
   
    // address: '28 East 35th Street',
    // geocoord: '(40.7481629397889,-73.9820653192304)',
    // building_name: 'J.H. Holmes Community House',
    // secondary_address: '',
    // meeting_name: 'EMPIRE STATE ',
    // details: 'T Last Wednesday',
    // meeting_code: 'C',
    // meeting_typename: 'Closed Discussion meeting',
    // weekday: 'Mondays',
    // starttime: '12:15PM',
    // endtime: '1:15PM',
    // special_interest: '' },
    
    // */
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
});

app.get('/temperature', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
//"CREATE TABLE sensorData ( sensorValue double precision, sensorTime timestamp DEFAULT current_timestamp );";

    // SQL query 
    // var q = `SELECT EXTRACT(DAY FROM sensorTime) as sensorday,
    //          AVG(sensorValue::int) as num_obs
    //          FROM sensorData
    //          GROUP BY sensorday
    //          ORDER BY sensorday;`;
///////
//var thisQuery = "SELECT * FROM sensorData;"; // print all values
//var secondQuery = "SELECT COUNT (*) FROM sensorData;"; // print the number of rows
var q = `SELECT sensorValue,
        COUNT (*) as num_obs
        FROM sensorData 
        WHERE (sensorValue > 70 AND sensorValue < 90)
        GROUP BY sensorValue
        ORDER BY sensorValue;`; // print the number of rows for each sensorValue


//  WHERE TIME - INTERVAL '5 hours' < timestamp '2020-11-30 23:59:59'
// time now - interval 30 days date time 
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

app.get('/processblog', function(req, res) {
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();

    // DynamoDB (NoSQL) query
//     var params = {
//         TableName : "aaronprocessblog",
//         KeyConditionExpression: "topic = :topic", // the query expression
//         ExpressionAttributeValues: { // the query values
//             ":topic": {S: "cats"}
//         }
//     };

//     dynamodb.query(params, function(err, data) {
//         if (err) {
//             console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
//             throw (err);
//         }
//         else {
//             console.log(data.Items)
//             res.end(pbtemplate({ pbdata: JSON.stringify(data.Items)}));
//             console.log('3) responded to request for process blog data');
//         }
//     });
// });

var params = {
    TableName : "processblog",
    KeyConditionExpression: "pk = :thisPk", // the query expression
    // ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
    //     "#tp" : "sleepHours"
    // },
    
    
    ExpressionAttributeValues: { // the query values
        ":thisPk": {N:"1"}
        //":thisPk": {N:"1"}
        // ":minDate": {N: new Date("October 2, 2020").valueOf().toString()},
        // ":maxDate": {N: new Date("October 4, 2020").valueOf().toString()}
    }
};

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log(data.Items);
        res.end(pbtemplate({ pbdata: JSON.stringify(data.Items)}));
            console.log('3) responded to request for process blog data');
        }
    });
});


// serve static files in /public
app.use(express.static('public'));

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// listen on port 8080
var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log('Server listening...');
});