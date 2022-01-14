const { randomBytes, createCipheriv, createDecipheriv } = require('crypto');
/**
 * Cipher/Decipher
 *      Using update() + final()
 *      Using transform streams
 */

const key = randomBytes(32),
  iv = randomBytes(16);
function encrypt(text) {
  const cipher = createCipheriv('aes256', key, iv);
  let cipheredText = cipher.update(text, 'utf-8', 'hex');
  cipheredText += cipher.final('hex');
  return cipheredText;
}

function decrypt(encryptedText) {
  const decipher = createDecipheriv('aes256', key, iv);
  let decipheredText = decipher.update(encryptedText, 'hex', 'utf-8');
  decipheredText += decipher.final('utf-8');
  return decipheredText;
}

const password = 'simple1234';
const encryptedPassword = encrypt(password);
const decryptedPassword = decrypt(encryptedPassword);

console.log('\n\n====crypto/sym-enc.js====');
console.log('Cipher with update and final');
console.log('Unencrypted password: ', password);
console.log('Encrypted password: ', encryptedPassword);
console.log('Decrypted password: ', decryptedPassword);
