const { promisify } = require('util');
const {
  generateKeyPair,
  publicEncrypt,
  privateDecrypt,
  getHashes,
  sign,
  verify,
} = require('crypto');

const password = 'simple1234';

const genKeyPairPromise = promisify(generateKeyPair);

(async function () {
  const { publicKey, privateKey } = await genKeyPairPromise('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  console.log('\n\n====crypto/asym-enc.js');
  console.log('Public key: ', publicKey);
  console.log('Private key: ', privateKey);

  console.log('\n\n====Assymetric encryption using public key');
  console.log('\nPassword: ', password);

  const encryptedPassword = publicEncrypt(publicKey, password);
  console.log('\nEncrypted password: ', encryptedPassword.toString('hex'));

  const decryptedPassword = privateDecrypt(privateKey, encryptedPassword);
  console.log('\nDecrypted password: ', decryptedPassword.toString('utf-8'));

  console.log(getHashes());

  //    Sign
  //      Create a signature
  const signature = sign('rsa-sha256', Buffer.from(password), privateKey);
  console.log('\n\n====Signature for the password====');
  console.log(signature.toString('hex'));

  const isVerified = verify(
    'rsa-sha256',
    Buffer.from(password),
    publicKey,
    signature
  );
  console.log('\n\n====Signature verification====');
  console.log(isVerified);
  //    Verify
  //      Create a verifier
  //      Update with data to verify
  //      verifier.verify
})();
