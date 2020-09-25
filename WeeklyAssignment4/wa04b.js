const { Client } = require('pg');
var async = require('async');  
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'dalbed349';
db_credentials.host = 'data-structures.ckg3d7ssdboe.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = 'ds20passds20';//process.env.AWSRDS_PW;
db_credentials.port = 5432;

//var addressesForDb =[ { address: '63 Fifth Ave, New York, NY', latLong: { lat: 40.7353041, lng: -73.99413539999999 } }, { address: '16 E 16th St, New York, NY', latLong: { lat: 40.736765, lng: -73.9919024 } }, { address: '2 W 13th St, New York, NY', latLong: { lat: 40.7353297, lng: -73.99447889999999 } } ];

//var addressesForDb = a;

//JSON.stringify ;//fs.readFileSync('home/ec2-user/environment/WeeklyAssignment4/map9geo.json');//JSON.parse(address);//JSON.stringify(address);
//var address = //fs.readFileSync('home/ec2-user/environment/WeeklyAssignment4/map9geo.json');
//var addresses = 
var addressesForDb = JSON.parse(fs.readFileSync('../WeeklyAssignment3/map9geo.json')); 
console.log(addressesForDb);

//[ { address: '63 Fifth Ave, New York, NY', latLong: { lat: 40.7353041, lng: -73.99413539999999 } }, { address: '16 E 16th St, New York, NY', latLong: { lat: 40.736765, lng: -73.9919024 } }, { address: '2 W 13th St, New York, NY', latLong: { lat: 40.7353297, lng: -73.99447889999999 } } ];

async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.StreetAddress.StreetAddress + "', " + value.LatLong[0]+ ", " + value.LatLong[1] + ");";  //"+value.City+", "+value.State+", "+value.Zip+",
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 