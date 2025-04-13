const jwt = require('jsonwebtoken');
require("dotenv").config();

const JwtSecret = process.env.ACCESS_TOKEN_SECRET;

function accessToken(payload) {
  try {
    return jwt.sign(payload, JwtSecret, { expiresIn: '15m' });
  } catch (err) {
    console.error(`Error generating access token: ${err.message}`);
    return null;
  }
}

function refreshToken(payload) {
  try {
    return jwt.sign(payload, JwtSecret, { expiresIn: '15d' });
  } catch (err) {
    console.error(`Error generating refresh token: ${err.message}`);
    return null;
  }
}

module.exports = {
  accessToken,
  refreshToken
};
