// make a request for 10 aa pages //

// npm install request
// mkdir data

var AAlist= [
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



 var i;
 for (i = 0; i < AAlist.length; i++) {
     
     
// request (AAlist[i], function(error, response, body)    
     
     
request('https://parsons.nyc/thesis-2020/', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/thesis.txt', body);   // '/home/ec2-user/environment/data/thesis' + AAlist[i] + '.txt'
    }
    else {console.log("Request failed!")}
});

}

console.log(AAlist.length)
