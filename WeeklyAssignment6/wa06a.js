const dotenv = require('dotenv');
const { Client } = require('pg');
const cTable = require('console.table');
dotenv.config({path: '../.env'});

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'dalbed349';
db_credentials.host = 'data-structures-20.ckg3d7ssdboe.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();


//var thisQuery = "SELECT Address, lat, long FROM aalocations WHERE lat>40.8;";
           var thisQuery = "SELECT Address, lat, long FROM aalocations WHERE lat<40.8;";

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.table(res.rows);
        client.end();
    }
});