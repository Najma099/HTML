import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Admin, User } from "../db/index.js";
dotenv.config({
  path:"../.env"
});
const JwtSecret = process.env.ACCESS_TOKEN_SECRET;

async function middleware(req, res, next) {
  try{
    const token = req.headers["authorization"];
    //const token = authHeader?.replace("Bearer", "").trim();
    
    if(!token) {
      res.clearCookie("refreshToken",{
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
    //console.log(decoded);
    let user;
    if(decoded.role == "admin") {
      user = await Admin.findById(decoded.id).select("-password -refreshedToken");
    }
    else if(decoded.role == "user") {
      user = await User.findById(decoded.id).select("-password -refreshedToken");
    }
    else {
      res.clearCookie("refeshedToken", {
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
    res.clearCookie("refreshToken", {
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

export default middleware;