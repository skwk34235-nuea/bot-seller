const crypto = require('crypto');

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}

function comparePassword(password, storedHash) {
  const [salt, hash] = String(storedHash || '').split(':');
  if (!salt || !hash) {
    return false;
  }

  const derivedKey = crypto.scryptSync(password, salt, 64);
  const hashBuffer = Buffer.from(hash, 'hex');

  if (derivedKey.length !== hashBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(derivedKey, hashBuffer);
}

module.exports = {
  hashPassword,
  comparePassword
};
