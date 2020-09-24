// make a request for 10 aa pages //

// npm install request
// mkdir data

var AAlist = [
"https://parsons.nyc/aa/m01.html",  
"https://parsons.nyc/aa/m02.html",  
"https://parsons.nyc/aa/m03.html",  
"https://parsons.nyc/aa/m04.html",  
"https://parsons.nyc/aa/m05.html" , 
"https://parsons.nyc/aa/m06.html"  ,
"https://parsons.nyc/aa/m07.html"  ,
"https://parsons.nyc/aa/m08.html"  ,
"https://parsons.nyc/aa/m09.html"  ,
"https://parsons.nyc/aa/m10.html" 
];
// request only work with url? can i refrence an object of urls?

var request = require('request');
var fs = require('fs');

// Insert for loop to repeat process 10 times. Potential errors include writing to the same thesis.txt file. 

//for (i in AAlist) {}

 var i;
 for (i = 0; i < AAlist.length; i++) {
     
// request (AAlist[i], function(error, response, body)    
     
    Writefile(i)

}


console.log(AAlist.length)

function Writefile (iter) {
    request(AAlist[iter], function(error, response, body){
    if (!error && response.statusCode == 200) {                                         /////////if completed requests = aalist.legth {
        fs.writeFileSync('/home/ec2-user/environment/WeeklyAssignment1/data/map'+ (iter+1) +'.txt', body);   // '/home/ec2-user/environment/data/thesis' + AAlist[i] + '.txt'  /// Map [undefined'.txt]
    }                                                                                       /// iter+1 to change txt file from map0 - map9
    else {console.log("Request failed!")}
});
    
}