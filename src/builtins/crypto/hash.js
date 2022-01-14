const crypto = require('crypto');

const password = 'simple1234';

const genHash = (string, algo, enc) => {
  return crypto.createHash(algo).update(string).digest(enc);
};

const verifyPassword = (inboundString, passwordString) => {
  return crypto.timingSafeEqual(
    genHash(inboundString, 'sha512'),
    genHash(passwordString, 'sha512')
  );
};

const hashedPassword = genHash(password, 'sha512', 'hex');
console.log('\n\n============crypto/hash.js=============');
console.log('password string: ', password);
console.log('hash of password string: ', hashedPassword);
console.log('verifyPassword', verifyPassword('simple1234', password));
