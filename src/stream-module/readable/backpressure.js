const fs = require('fs');
const { Readable, Writable } = require('stream');
/**
 * Backpressure
 *  1. writable.write returns false when
 *      A buffer has exceeded a highWaterMark value is reached
 *      Or a write queue is currently busy
 *  2. drain event on a writable
 *  3. Guidelines on readable
 *      Stop pushing if push returned false.
 *  4. Guidelines for writable
 *      If write returns false, pause readable.
 *      Wait for 'drain' event and then resume readable
 */

let readable = new Readable({
  highWaterMark: 20,
});

let count = 0;
readable._read = function () {
  while (++count < 100 && !this.push(`\nA sample text: ${count}`)) {
    // console.log('\nbackpressure.js -> readable._read()');
  }
};

readable.on('pause', () => {
  console.log('\n\nbackpressure.js -> readable paused.\n\n');
});
readable.on('resume', () => {
  console.log('\n\nbackpressure.js -> readable resumed.\n\n');
});

readable.setEncoding('utf-8');

let writable = fs.createWriteStream('src/samples/sm-file7.txt', 'utf-8');

readable.on('data', (data) => {
  let canWriteNext = writable.write(data);

  if (!canWriteNext) {
    console.log('\n\nbackpressure.js -> Threshold limit reached.\n\n');
    readable.pause();
    writable.once('drain', () => {
      console.log('\n\nBuffer drained\n\n');
      readable.resume();
    });
  }
});
