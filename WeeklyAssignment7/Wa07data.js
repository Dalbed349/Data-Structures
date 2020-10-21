// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
let filename = 'data/map9'
var content = fs.readFileSync(filename + '.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

var aa = {
    zone: 'Zone 4',
    address: [],
    meeting_data: []

};
    
 var thisMeetingObj = {
    thisMeetingNumberArray: [], 
    thisBuildingNameArray: [],
    thisStreetAddressArray: [],
    thisSecondaryAddressArray: [],
    thisMeetingNameArray: [],
    thisDetailsBoxArray: [],
    thisWheelChairArray: [],
    thisMeetingDayArray: [],
    
 };// 

 
 
let counter = 1;
$('td').each(function(I, elem) {
    


   
                   
                    if ($(elem).attr('style') === 'border-bottom:1px solid #e3e3e3; width:260px') {
                
                        // console.log($('div:nth-child(8)').html().trim())
                    
                        //thisMeeting.thisMeetingArray.push({
                            var meeting_number = counter;
                           var building_name =  $(elem).html().split('</h4>')[0].trim().split("<h4 style=\"margin:0;padding:0;\">")[1];
                            var street_address = $(elem).html().split('<br>')[2].trim().match(/^\d{1,5}.+?(?=,|-)/gm)[0];
                            var secondary_address = $(elem).html().split('<br>')[2].trim().split(',').splice(1, 2);
                            var meeting_name= $(elem).html().split('<br>')[1].trim().match(/\b(\d{1,3}\s|\d{1,3}nd\s|\d{1,3}rd\s|\d{1,3}st\s|\d{1,3}st\s|[A-Z\s])+\b.+?(?=-)/gm)[0];
                            var detailsbox= $(elem).find('div').text().trim();
                           var wheelchair= $(elem).text().trim().match(/(Wheelchair access)/gm);
                            
                        //   var thisMeeting = {}
                        //   thisMeeting.building_name = building_name;
                           
                           thisMeetingObj.thisMeetingNumberArray.push(meeting_number);
                           thisMeetingObj.thisBuildingNameArray.push(building_name);
                           thisMeetingObj.thisStreetAddressArray.push(street_address);
                           thisMeetingObj.thisSecondaryAddressArray.push(secondary_address);
                           thisMeetingObj.thisMeetingNameArray.push(meeting_name);
                           thisMeetingObj.thisDetailsBoxArray.push(detailsbox);
                           thisMeetingObj.thisWheelChairArray.push(wheelchair);
                           
                        //})
                        counter++;
                    } 
    
    
    else if ($(elem).attr('style') === 'border-bottom:1px solid #e3e3e3;width:350px;') {
        var addressArray = ($(elem).html().trim().replace(/\s+/g,' ').split('<br> <br>' && '<br>' && '<b>' && '</b>' && '<br> <br> <b>')); 
              //console.log(addressArray.length)
             // console.log(addressArray)
                       //let addressDay = ($(elem).html().trim().replace(/\s+/g,' ').split('<br> <br>' && '<br>' && '<b>' && '</b>' && '<br> <br> <b>'))
                 
            // for (let i=0; i<addressArray.length; i++) {
         var meetingStartArray =   ($(elem).html().trim().replace(/\s+/g,' ').split('<br> <br>' && '<br>' && '<b>' && '</b>' && '<br> <br> <b>')); 
         
        //  let meetingEndArray = ($(elem).html().trim().replace(/\s+/g,' ').split('<br> <br>' && '<br>' && '<b>' && '</b>' && '<br> <br> <b>')), 
         
        //  let meetingTypeArray =($(elem).html().trim().replace(/\s+/g,' ').split('<br> <br>' && '<br>' && '<b>' && '</b>' && '<br> <br> <b>')), 
          
        //  let specialInterestArray = ($(elem).html().trim().replace(/\s+/g,' ').split('<br> <br>' && '<br>' && '<b>' && '</b>' && '<br> <br> <b>')) ;
    // }
                              //let addressDaySplit = (addressDay.toString().split('<br> <br> <b>' && '<b>'))

               //console.log(addressDaySplit)
                //aa.address['meetingDay'] = addressArray
//
                
     //console.log(thisMeeting.thisMeetingArray)
     
     
      thisMeetingObj.thisMeetingDayArray.push(addressArray);

    //  thisMeeting.thisMeetingArray.push({
                
    //                 meetingDay: ($(elem).html().trim().replace(/\s+/g,' ').split('<br> <br>' && '<br>' && '<b>' && '</b>' && '<br> <br> <b>')),
    //                 meetingStart: ($(elem).html().trim().replace(/\s+/g,' ').split('<br> <br>' && '<br>' && '<b>' && '</b>' && '<br> <br> <b>')), 
    //                 meetingEnd: ($(elem).html().trim().replace(/\s+/g,' ').split('<br> <br>' && '<br>' && '<b>' && '</b>' && '<br> <br> <b>')),
    //                 meetingType: ($(elem).html().trim().replace(/\s+/g,' ').split('<br> <br>' && '<br>' && '<b>' && '</b>' && '<br> <br> <b>')),
    //                 specialInterest: ($(elem).html().trim().replace(/\s+/g,' ').split('<br> <br>' && '<br>' && '<b>' && '</b>' && '<br> <br> <b>')),
                    
    //             })
    //           // console.log(addressArray)
  }
     
     
     
     
  
//console.log(thisMeeting.thisMeetingArray)
//console.log(aa.meeting_data)
//console.log(aa.meeting_data)
    
// console.log(aa)


// fs.writeFileSync(filename + '_JSON' + '.txt', JSON.stringify(aa));

//     meeting_day: $(elem).html().trim().split('<br>').forEach(e => {
//         console.log(e.match(/(Mo(n(day)?)?|Tu(e(sday)?)?|We(d(nesday)?)?|Th(u(rsday)?)?|Fr(i(day)?)?|Sa(t(urday)?)?|Su(n(day)?)?)+/gm))
//         // console.log(e.split('</b>'))
//     })
 })  
 console.log(thisMeetingObj)