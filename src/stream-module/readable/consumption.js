const fs = require('fs');
/**
 * ======== Consumption ========
 * 1. In flowing mode
 *      'data' event
 *      pipe
 * 2. In paused mode
 *      'readable' event
 */

let r1 = fs.createReadStream('src/samples/sm-file4.txt');
let r2 = fs.createReadStream('src/samples/sm-file4.txt');
let r3 = fs.createReadStream('src/samples/sm-file4.txt');

r1.on('data', (data) => {
  console.log('\n\nconsumption.js -> Reading fs stream using data event');
  console.log(data.toString());
});

r2.pipe(process.stdout);

r3.on('readable', () => {
  console.log('\n\nconsumption.js -> Reading fs stream using readable event');
  let chunk;
  while ((chunk = r3.read()) != null) {
    console.log(chunk.toString());
  }
});
