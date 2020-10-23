"use strict"

// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv');

// TAMU api key
dotenv.config({path: '/home/ec2-user/environment/.env'});

const API_KEY = process.env.MY_SECRET;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx';

// let map9geo = 

// geocode addresses
let meetingsData = [];
let filename = 'map2.json'

let aa = fs.readFileSync('/home/ec2-user/environment/WeeklyAssignment7/data/'+ filename);



let addresses = JSON.parse(aa);

//fs.readFileSync('/home/ec2-user/environment/WeeklyAssignment2/map9locations3.json'); //["63 Fifth Ave", "16 E 16th St", "2 W 13th St"]; ////Need to put read filesync here 

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    let query = {
        streetAddress: value.street_address,
        city: "New York",
        state: "NY",
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };

    // construct a querystring from the `query` object's values and append it to the api URL
    let apiRequest = API_URL + '?' + querystring.stringify(query);

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
        meetingsData.push(tamuGeoFinal);
    });

    // sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
}, 
    
    function() {
    fs.writeFileSync('map2geo.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
    console.log(meetingsData)
    // fs.readFileSync('WeeklyAssignment3/map9geo.json', JSON.parse(meetingsData)),
    // console.log(meetingsData);
    
});
