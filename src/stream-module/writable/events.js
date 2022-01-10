const fs = require('fs');
const { Writable } = require('stream');
/**
 * Events
 *      close: same as readable
 *      drain
 *      finish
 */

let reader = fs.createReadStream('src/samples/sm-file8.txt', {
  highWaterMark: 5,
});

let writable = new Writable({
  write(chunk, enc, callback) {
    console.log(`\n\nwriteable/events.js write()-> ${chunk}\n\n`);
    callback();
  },
  highWaterMark: 2,
});

reader.on('data', (data) => {
  console.log(`\n\nwriteable/events.js data event-> ${data}\n\n`);
  console.log('\n\nwritable.write() returned -> ', writable.write(data));
});

writable.on('drain', () => {
  console.log(`\n\nwriteable/events.js -> drain event\n`);
});
