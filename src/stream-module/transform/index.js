const { Transform } = require('stream');
const fs = require('fs');

const reader = fs.createReadStream('src/samples/read.txt');

const transform = new Transform({
  transform(chunk, enc, next) {
    console.log('\n\n====stream-module/transform');
    this.push(chunk.toString().toUpperCase());
    next();
  },
});

reader.pipe(transform).pipe(process.stdout);
