const { createHmac } = require('crypto');

const password = 'hello1234';

const hmac = createHmac('sha512', 'super-secret-key')
  .update(password)
  .digest('hex');

console.log('\n\n====crypto/hmac.js====');
console.log('Password: ', password);
console.log('hmac: ', hmac);
