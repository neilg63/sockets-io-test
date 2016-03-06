var moment = require("moment");

var now = moment();

console.log( now.format() );

console.log( now.format("X") );

console.log( now.valueOf() );

// console.log( now.format("h:mma") );

// now.subtract(1,'year');

// console.log(now.format("MMMM Do YYYY h:mma"));

var timestamp = 1457280264444;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format("DD/MM/YYYY h:mm a"));