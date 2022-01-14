const { Duplex } = require('stream');
const fs = require('fs');

const writer = fs.createWriteStream('src/samples/write.txt');

let count = 0;
const duplex = new Duplex({
  read() {
    if (count > 100) {
      this.push(null);
    } else {
      this.push(String(count++));
      this.push('\n');
    }
  },
  write(chunk, enc, next) {
    writer.write(chunk.toString());
    next();
  },
});

duplex.pipe(duplex);
