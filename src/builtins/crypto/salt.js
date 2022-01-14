const { promisify } = require('util');
const { scrypt, randomBytes, timingSafeEqual } = require('crypto');

const scryptPromise = promisify(scrypt);

const users = [];

const signup = async (username, password) => {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scryptPromise(password, salt, 64)).toString('hex');
  return {
    username,
    password: `${salt}:${derivedKey}`,
  };
};
const login = async (username, password) => {
  const existingUser = users.find((u) => {
    return u.username === username;
  });
  if (!existingUser) return false;

  const [salt, derivedKey] = existingUser.password.split(':');

  const existingKeyBuffer = Buffer.from(derivedKey, 'hex');

  const newDerivedKey = await scryptPromise(password, salt, 64);

  return timingSafeEqual(existingKeyBuffer, newDerivedKey);
};

const main = async () => {
  const user = await signup('foo@bar.com', 'hello');
  users.push(user);

  console.log('\n\n====crypto/salt.js====');
  console.log('User: ', user);

  const isLoggedIn = await login('foo@bar.com', 'hello');
  if (isLoggedIn) {
    console.log('User logged in successfuly');
  } else {
    console.log('Invalid credentials');
  }
};

main();
