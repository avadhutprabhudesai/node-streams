const fs = require('fs');
const { Writable } = require('stream');
/**
 * Consumption
 *      .Piping it to the readable stream.
 *      .Using write in 'data' event of readable.
 */

let reader = fs.createReadStream('src/samples/sm-file8.txt', {
  highWaterMark: 2,
});
let writer = new Writable({
  write(chunk, enc, callback) {
    console.log('\n\nwritable/consumption.js -> piping');
    console.log('chunk received', chunk.toString());
    console.log('\n\n');
    callback();
  },
});

reader.pipe(writer);
