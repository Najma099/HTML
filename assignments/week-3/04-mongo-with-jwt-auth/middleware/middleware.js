import dotenv from "dotenv";
import jwt from "jsonwebtoken";
const { Admin, User } = require("../db");

dotenv.config();
const JwtSecret = process.env.ACCESS_TOKEN_SECRET;

async function middleware(req, res, next) {
  try{
    const authHeader = req.headers["authorization"];
    const token = authHeader?.replace("Bearer ", "").trim();
    
    if(!token) {
      res.clearCookies("refreshToken",{
        httpOnly: true,
        Secure: true,
        sameSite: "lax"
      }) 
      return res.status(401).send({
        ok: false,
        message:"Unauthorized Access: No tokens provided!"
      });
    };
    
    const decoded = jwt.verify(token, JwtSecret);
  
    let user;
    if(decoded.role == 'Admin') {
      user = await Admin.findById(decoded._id).select("-password -refreshedToken");
    }
    else if(decoded.role == 'User') {
      user = await User.findById(decoded._id).select("-password -refreshedToken");
    }
    else {
      res.clearCookies("refeshedToken", {
        httpOnly: true,
        Secure: true,
        sameSite: "lax"
      });
      return res.status(403).send({
        ok: false,
        message: 'Access denied: Invalid role'
      })
    };
    
    if(!user) {
      return res.status(404).send({
        ok: false,
        message: "Invalid User"
      });
    }
    
    req.user = user;
    next();
  }
  catch(err) {
    console.error(`Error verifing the token ${err}`);
    res.clearCookies("refreshToken", {
      httpOnly: true,
      secure: true,
      SameSite: "lax"
    });
    res.status(404).send({
      ok: false,
      message: "Token expired or invalis",
      error: err.message
    })
  }
}