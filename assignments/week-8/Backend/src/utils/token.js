import config from "../../config.js";
import jwt from 'jsonwebtoken';
const accessToken = (payload) => {
 try{
   return jwt.sign(payload, config.jwt.secret, {expiresIn: '15d'});
 }
 catch(err) {
   console.log("Error generating access token", err);
   return null;
 }
}

const refreshedToken = (payload) => {
  try {
    return jwt.sign(payload, config.jwt.secret, { expiresIn: '15d' });
  }
  catch (err) {
    console.log("Error generating refreshed token", err);
    return null;
  }
};
export { accessToken, refreshedToken };