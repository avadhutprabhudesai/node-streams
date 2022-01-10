const fs = require('fs');
const fsp = require('fs/promises');
/**
 * Events
 *  . data
 *  . end
 *  . error
 *  . pause
 *  . readable
 */

(async function () {
  let fd = await fsp.open('src/samples/sm-file5.txt');
  let rs1 = fs.createReadStream('src/samples/sm-file5.txt', {
    fd: fd,
    emitClose: true,
    autoClose: false,
    highWaterMark: 1,
  });

  rs1.resume();

  rs1.on('close', () => {
    console.log('\n\nreadable/events.js -> readable stream close event\n\n');
  });

  rs1.on('end', () => {
    console.log('\n\nreadable/events.js -> readable stream end event\n\n');
  });

  setTimeout(() => {
    fd.close();
  }, 2000);
})();
