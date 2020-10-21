const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv');
      

let GeoCodes = fs.readFileSync('/home/ec2-user/environment/WeeklyAssignment7/Geocodes/map1geo.json');

let GeoCode = JSON.parse(GeoCodes);

let map1 = fs.readFileSync('/home/ec2-user/environment/WeeklyAssignment7/data/map1.json');

let map1AddGeo = JSON.parse(map1);

//console.log(map1AddGeo)
//console.log(GeoCode);


let combinedData = [];

for(let i = 0; i<GeoCode.length; i++){
        let LtLg = GeoCode[i].LatLong;
        //console.log(LtLg);
        combinedData.push(LtLg);
}

//console.log(combinedData);
// console.log(map1AddGeo)

for(let i =0; i<map1AddGeo.length; i++){
    map1AddGeo[i].Coordinates = combinedData[i];
}

// map1AddGeo.forEach(location => {
//     map1AddGeo.MapGeoCodes = location; 
//     console.log(map1AddGeo)
// })

console.log(map1AddGeo);


fs.writeFileSync("/home/ec2-user/environment/WeeklyAssignment7/CombinedOutputs/Map1Combined.json", JSON.stringify(map1AddGeo))


//fs.writeFileSync('map9geo.json', JSON.stringify(meetingsData));

