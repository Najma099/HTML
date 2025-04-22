import jwt from "jsonwentoken";
import config from "../config";
import { User } from "../models/User";
async function Authmiddleware(req, res, next) {
  try {
    const token = req.headers["authorization"];
    token = token.split(" ")[1];
    if(!token) {
      clearCookie("accessTokens",
        {
          httpOnly: true,
          secure: true
        });
      return res.status().send({
        ok: false,
        message:"No token provided"
      })
    }
  
    const valid = jwt.verify(token, config.jwt);
    if(!valid) {
      clearCookie("accessTokens",
        {
          httpOnly: true,
          secure: true
        });
      return res.status().send({
        ok: false,
        message: "invalid Tokens. Please Signin"
      });
    };
    const user = await User.findById(valid.id).select("-password -refreshedToken");
    res.body = user;
    next();
  }
  catch(err) {
    console.error(`Error verifing the token ${err}`);
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.status(404).send({
      ok: false,
      message: "Token expired or invalid",
      error: err.message
    })
  }
};
export { Authmiddleware };