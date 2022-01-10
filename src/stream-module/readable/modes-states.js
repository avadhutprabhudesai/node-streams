const { Readable } = require('stream');
const fs = require('fs');
/**
 * Modes
 *  1. Flow mode
 *      calling stream.resume
 *      calling stream.pipe()
 *      adding 'data' event handler
 *  2. Paused mode
 *      calling stream.pause
 *      calling stream.unpipe
 *
 * States
 *  1. readableFlowing = null
 *      When no mechanism to receive or ignore data is provided
 *  2. readableFlowing = true
 *      When stream is in flow mode and data is auto-fed to application
 *  3. readableFlowing = false
 *      When stream is in paused mode.
 */

// Flow mode

let rs1 = fs.createReadStream('src/samples/sm-file4.txt');

console.log('\n\nmodes-states.js -> Default state of a Readable stream');
console.log('rs1.readableFlowing -> ', rs1.readableFlowing);

rs1.resume();
console.log(
  '\n\nmodes-states.js -> State of a Readable stream after stream.resume'
);
console.log('rs1.readableFlowing -> ', rs1.readableFlowing);

let rs2 = fs.createReadStream('src/samples/sm-file4.txt');

console.log('\n\nmodes-states.js -> Default state of a Readable stream');
console.log('rs2.readableFlowing -> ', rs2.readableFlowing);

rs2.pipe(process.stdout);
console.log(
  '\n\nmodes-states.js -> State of a Readable stream after stream.pipe()'
);
console.log('rs2.readableFlowing -> ', rs2.readableFlowing);

let rs3 = fs.createReadStream('src/samples/sm-file4.txt');

console.log('\n\nmodes-states.js -> Default state of a Readable stream');
console.log('rs3.readableFlowing -> ', rs3.readableFlowing);

rs3.on('data', () => {});
console.log(
  '\n\nmodes-states.js -> State of a Readable stream after attaching data event'
);
console.log('rs3.readableFlowing -> ', rs3.readableFlowing);

// Pause mode
rs1.pause();
console.log(
  '\n\nmodes-states.js -> State of a Readable stream after stream.pause()'
);
console.log('rs1.readableFlowing -> ', rs1.readableFlowing);

rs2.unpipe();
console.log(
  '\n\nmodes-states.js -> State of a Readable stream after stream.unpipe()'
);
console.log('rs2.readableFlowing -> ', rs2.readableFlowing);
