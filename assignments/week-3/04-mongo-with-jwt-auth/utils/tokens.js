import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({
  path:"../.env"
})

const JwtSecret = process.env.ACCESS_TOKEN_SECRET;

export const accessToken = (payload)=> {
  try {
    return jwt.sign(payload, JwtSecret, { expiresIn: '15m' });
  } catch (err) {
    console.error(`Error generating access token: ${err.message}`);
    return null;
  }
}

export const refreshToken = (payload)=> {
  try {
    return jwt.sign(payload, JwtSecret, { expiresIn: '15d' });
  } catch (err) {
    console.error(`Error generating refresh token: ${err.message}`);
    return null;
  }
}

export default {
  accessToken,
  refreshToken
};
