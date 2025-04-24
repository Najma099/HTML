import jwt from "jsonwebtoken";
import config from "../../config.js";
import { User } from "../models/User.model.js";

async function Authmiddleware(req, res, next) {
  try {
    let token = req.headers["authorization"];
    if (!token || !token.startsWith("Bearer ")) {
      res.clearCookie("accessTokens", {
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
      });
      return res.status(401).send({
        success: false,
        message: "No token provided"
      });
    }

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, config.jwt.secret);

    const user = await User.findById(decoded.id).select("-password -refreshedToken");
    if (!user) {
      res.clearCookie("accessTokens", {
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
      });
      return res.status(401).send({
        success: false,
        message: "Invalid token. User not found"
      });
    }

    req.user = user;
    next();
  }
  catch (err) {
    console.error(`Error verifying the token: ${err}`);
    res.clearCookie("accessTokens", {
      httpOnly: true,
      secure: true,
      sameSite: 'lax'
    });
    res.clearCookie("refreshTokens", {
      httpOnly: true,
      secure: true,
      sameSite: 'lax'
    });
    
    if (err.name === "TokenExpiredError") {
      return res.status(401).send({
        success: false,
        message: "Token expired",
        error: err.message
      });
    }

    return res.status(401).send({
      success: false,
      message: "Token invalid",
      error: err.message
    });
  }
}

export { Authmiddleware };
