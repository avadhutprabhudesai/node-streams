const { Writable } = require('stream');

/**
 * Creation
 *      . Using inline constructor
 *      . Extending Writable
 */

// Using inline constructor
let writableInline = new Writable({
  write(chunk, enc, callback) {
    console.log('\n\nwritable/creation.js -> Using inline constructor');
    console.log('chunk: ', chunk.toString());
    callback();
  },
});

writableInline.write('A simple text');

class WritableStream extends Writable {
  constructor(opts) {
    super(opts);
  }

  _write(chunk, enc, callback) {
    console.log('\n\nwritable/creation.js -> Extending Writable class');
    console.log('chunk: ', chunk.toString());
    callback();
  }
}

let writableExtend = new WritableStream();
writableExtend.write('A simple text');
