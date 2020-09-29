# Goal: 
## Part 1
   ### Draw a model for the AA meetings data to be stored in a database. 
   
    1. I tried to draw a representation of a normalized Database however I ended up confusing myself further.
    2. The png that is uploaded shows the variables that I find to be relevant for this project. i.e. Meeting type, Meeting time, geolocation, and more. 

## Part 2
   ### Create Table in Database. 
    Use ** pg ** module in node to add a table to database with SQL statements. 
    
    1. Working from **wa04a.js**. Require 'pg' and 'dotenv'. 
    2. Configure dotenv path with the following code: 
    ```

         const { Client } = require('pg');
         const dotenv = require('dotenv');
         dotenv.config({path: '../.env'});

    ```
    
    3. Lines 7-12, Set credentials of database. 
    
    4. Line 19, SQL code to create a table with 3 columns.
    
    ```
         var thisQuery = "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision);";
    ```
    5. To delete a table: 
    ```
         var thisQuery = "DROP TABLE aalocations;"; 
    ```
    
    
## Part 3 
   ### Populate database. 
    Use **pg** in node to add data to table created in part 2. 
    
    1. Working from **wa04b.js**. Require 'async', 'pg', 'dotenv'. 
    
    2. Line 21, use fs.readFileSync and json parse to bring geo location and address data. 
    ```
        var addressesForDb = JSON.parse(fs.readFileSync('../WeeklyAssignment3/map9geo.json')); 
        console.log(addressesForDb);
    ```
    3. Line 26, an async eachSeries with a callback time of 1000ms will place 1 row of JSON data into the table every second.
    
    4. Line 29, The table created in Part 2 has 3 columns. The following code inserts data from the parsed JSON file into them.
   
    ```
         var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.StreetAddress.StreetAddress + "', "+ value.LatLong[0]+ ", " + value.LatLong[1] + ");";
    ```
    5. **wa04b.js** Line 17 runs the following code to see what is in the table.
    ``` 
        var thisQuery = "SELECT * FROM aalocations;";
    ```
    
# Relevant Files:
1. README.md
2. wa04a.js
3. wa04b.js
4. wa04c.js
5. DatabaseSchema?.PNG
