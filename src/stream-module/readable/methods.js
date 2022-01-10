const fs = require('fs');
/**
 * Methods:
 *  . readable.setEncoding()
 *  . readable.destroy()
 */

let rs = fs.createReadStream('src/samples/sm-file6.txt');

rs.setEncoding('utf-8');

rs.on('data', (data) => {
  console.log('\n\nreadable/methods.js -> setEncoding()');
  console.log(data);
});

let rs1 = fs.createReadStream('src/samples/sm-file6.txt');

rs1.resume();

rs1.on('close', () => {
  console.log('\n\nreadable/methods.js -> close event\n\n');
});
rs1.on('end', () => {
  console.log('\n\nreadable/methods.js -> end event\n\n');
});

setTimeout(() => {
  rs1.destroy();
}, 3000);
