const { Readable } = require('stream');

/**
 * ======== Creation ========
 * 1. Inline constructor
 * 2. Extending Readable class
 */

// 1. Inline constructor

let count = 0;
const inlineReadable = new Readable({
  read() {
    if (count > 10) {
      this.push(null);
    } else {
      this.push('\n' + String(count++));
    }
  },
});

inlineReadable.pipe(process.stdout);

// 2. Extending Readable class
class MyReadable extends Readable {
  constructor(opts) {
    super(opts);
    this.count = 0;
  }

  _read() {
    if (this.count > 10) {
      this.push(null);
    } else {
      this.push('\n' + String(this.count));
      this.count++;
    }
  }
}

let classReadable = new MyReadable();

classReadable.pipe(process.stdout);
