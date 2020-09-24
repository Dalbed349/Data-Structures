// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('/home/ec2-user/environment/WeeklyAssignment1/data/map9.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// print (to the console) names of thesis students                 // h4 covers 3 of the 4... td covers way more stuff but all 4 of the locations...
// $('table').each(function(i, elem) {                                 //we have 3 <th> elements, 
//     console.log($(elem).text());
// });

// write the project titles to a text file
var map9txt = ''; // this variable will hold the lines of text

$("body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr > td:nth-child(1)").each(function(i, elem) {
    map9txt += ($(elem).html()).trim(); // move code into this each function ***********************
    
   
});

//i want text between <br>[2] and <br>[3]

fs.writeFileSync('/home/ec2-user/environment/WeeklyAssignment2/map9locations2.txt', map9txt);



// I want to target the body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr > td. 
// for each tr i want the first td 
// line 21 currently pulls all tds and prints them. I need to specify which td in which tr. 


//body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(1) > td:nth-child(1)
// DATA IS IN THE SECOND <br> for each td in the trs. 
//for each i = 0 , i< tr:nth-child(i)
//body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > br:nth-child(4)
// > br:nth-child(4)


// selector body > center > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > br:nth-child(4)


var text = fs.readFileSync('/home/ec2-user/environment/WeeklyAssignment2/map9locations2.txt').toString('utf-8');				
// console.log("Synchronous read: " + text.toString()); 
// console.log(typeof text)
// // newtxt = extractBetween(text,'>','','') 


// var test_str = "|text to get| Other text.... migh have \"|\"'s ...";
// // var start_pos = test_str.indexOf('|') + 1;
// var end_pos = test_str.indexOf('|',start_pos);
// var text_to_get = test_str.substring(start_pos,end_pos)
// alert(text_to_get);

// get_between = function(text, first_character, last_character) {
//     new_txt = text.match(first_character + "(.*)" + last_character).trim()
//     return(new_txt)
//     }

// get_between(text,'>',',')

 var text2 = text.split("<br>");
 //var text3 = text2.split(",");
var text3 = [text2[2].trim().split(","), text2[7].trim().split(","), text2[12].trim().split(","), text2[17].trim().split(",")]
//console.log(text4)
//console.log(typeof text3)
//var text4 = text3.split("a");

// var obj1 = text3[0]
// var obj2 = text3[1]
// var obj3 = text3[2]
// var obj4 = text3[3]
// console.log(text3)
//console.log(obj1[0])
var obj5 = [text3[0][0], text3[1][0], text3[2][0], text3[3][0]]  
console.log(obj5)
// var map9address = [obj1[0], obj2[0], obj3[0], obj4[0]]
// console.log(map9address)
// console.log(typeof map9address)
//console.log(text3)
// var text4 = [text3[0]] //, text3[1], text3[2], text3[3]]
//console.log (text4[0])

fs.writeFileSync('/home/ec2-user/environment/WeeklyAssignment2/map9locations3.txt', obj5.join('\n'));


// console.log(text4)
//console.log(text2[2])
//  console.log(text2[7])
//  console.log(text2[12])
//  console.log(text2[17])
//  var text4 = text3
 //console.log(Array.from(text3));
//fs.writeFileSync('/home/ec2-user/environment/WeeklyAssignment2/map9locaions3.txt', text2);

// <br>[2] text <br>[3]
// between <br> and , or <br> and <br>