const fs = require('fs');
/**
 * Readable stream
 *  Read a file using stream and output it to stdout
 * Writable stream
 *  Read the content from stdin and write it to a file using stream
 *
 * Difference between readStream and readFile
 *
 */

function createLargeData() {
  let writer = fs.createWriteStream('src/samples/large.txt', 'utf-8');

  for (let i = 0; i < 10; i++) {
    writer.write(
      'Lorem Ipsum is simply dummy text of the printing and \ntypesetting industry. Lorem Ipsum has been the industrys standard dummy text ever\n.'
    );
  }

  writer.end((err) => {
    console.log('\n\nWrite stream closed');
  });
}
function readLargeData() {
  let reader = fs.createReadStream('src/samples/large.txt', {
    encoding: 'utf-8',
    flags: 'r',
    highWaterMark: 5,
  });

  let chunks = [];
  reader.on('data', (chunk) => {
    chunks.push(chunk);
  });
  reader.on('ready', () => {
    console.log('Read Stream ready');
    reader.pipe(process.stdout);
  });
  reader.on('close', () => {
    console.log('Read Stream closed');
  });
  reader.on('error', (err) => {
    console.log('Read Stream error');
    console.log(err);
  });
}

createLargeData();
readLargeData();
