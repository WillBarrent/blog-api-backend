const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function verifyPassword(password, userPassword) {
  const match = await bcrypt.compare(userPassword, password);

  return match;
}

module.exports = {
  hashPassword,
  verifyPassword,
};
