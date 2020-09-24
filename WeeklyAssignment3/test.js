const fs = require('fs');

const myArray = ['Apple', 'Banana', 'Pear']
//when writing things
fs.writeFileSync('WeeklyAssignment3/test.json', JSON.stringify(myArray));

// when reading things
JSON.parse()