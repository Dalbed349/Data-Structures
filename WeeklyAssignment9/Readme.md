# Weekly Assignments 8 + 9 
Setup the Particle Photon Temperature Sensor, create a new RDS table for the sensor data, and begin to write values into it. 


## Weekly Assignment 8 : Setup Particle Photon Temperature Sensor and create an api request to the device. 
1. Step 1 for weekly Assignment 8 was to assemble a circuit containing the breadboard, photon wifi computer chip, 4 wires, a resistor, and adafruit temperature sensor. Image of my complete build: 
	- Reference Image and instructions found [here](https://github.com/visualizedata/data-structures/tree/master/weekly_assignment_08)
2. setup.particle.io - Website for setting up device. 
	- photon / p series 
3. build.particle.io - to select starter code: 
	- search libraries for adafruit and select dht-test.ino
	- remove loop found in lines 82-86.  
4. when making changes to this c++ code, always 'verify' before 'flashing'. 
5. In order to create an api token it was necessary to install the Particle CLI which uses node.js. 
	- install in terminal with: ``bash <(  curl -sL https://particle.io/install-cli ) ``
	- ``particle login ``
	- ``particle token create``
	- The device code can be found at https://console.particle.io/events
	- when combined these can substitute placeholder values for this sample api call. The first 1234abcd is the device code while the second 12345abcdef is the token. VARIABLE should be replaced by the name of whatever we want to measure which in this case is named 'temp' in the dht-test.ino file. https://api.particle.io/v1/devices/1234abcd/VARIABLE?access_token=12345abcdef


## Weekly Assignment 9: Create a RDS table and write values into it. 
1. Assignment 9 has three components. 
	1. Wa09a.js which creates a table in an RDS database, 
	2. Wa09bWorker.js which uses insert into functions to place values into the table, and 
	3. Wa09cCheck.js which uses SQL statements to print the contents of the tables to the console. 
2. Wa09a.js
	- make sure to set up all db credentials and add ``const dotenv = require('dotenv');
dotenv.config({path: '../.env'});`` to target aws pass. 
3. IMPORTANT: change aws setting to 'never stop my environment' This will result in increased daily charges. 
4. In order to run a script in the background without explicitly calling it : install PM2 Runtime, a process manager for Node.js. 
	- To install: ``npm install pm2 -g`` , and to add pm2 ecosystem file ``pm2 init`` 
5. Wa09bWorker.js will be run with PM2. The file parses the api URL created by the sensor. In the ecosystem.config.js file it is important to change the ``script:`` section to read `` script:Wa09bWorker.js`` 
6. the `` env:`` section of the ecosystem must contain the     `` "PHOTON_ID", "PHOTON_TOKEN": , and "AWSRDS_PW": ``
7. IMPORTANT! treat this ecosystem file as an env file and DO NOT upload to github. 
8. to start the PM2 instance use `` pm2 start ecosystem.config.js``
	- ``pm2`` list to check status 
	- ``pm2 stop 0`` to stop instance 
9. Wa09cCheck.js can be run with node to get an organized output of the data. 