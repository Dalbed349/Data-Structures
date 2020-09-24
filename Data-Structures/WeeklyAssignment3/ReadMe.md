  Goal: 1.Write a script that makes a request to the Texas A&M Geoservices Geocoding APIs for each address, using the address data you parsed in Weekly Assignment 2.
        2. Your final output should be a .json file that contains an array that contains an object for each meeting.
  
  
  ### Notes:-
   
 --------Process---------
1. IMPORTANT. Set up .env file with protected API key. 
2. Load dependencies: Dotenv, async, request, querystring, fs. 
2. Set API key and URL consts. 
3. Line 18 - Create meetings data array.
4. Line 20 - Use fs.readFileSync to import JSON data and parse it. .parse
4. Line 36 - Setup api request. 
5. Line 43 - .push the input address of tamugeo(the parsed body of json) to meetingsdata array
6. Line 44 - Create new object latlong. This object will end up inside of meetingsdata.
7. Line 49-51 - push latitudes and longitudes to LatLong, and then push latlong to meetingsdata.
7. Line 60 - Fs.writefilesync and JSON.stringify to send meetingsdata to json format. 

 
            

 
 IMPORTANT: Commented out code may or may not be relevant. Serves as a log of thought process.
 
  Relevant Files:  
    -- Readme.md   
    -- wa03.js    
    -- map9geo.json
    