import jwt from "jsonwebtoken";
import config from "../../config.js";
import { User } from "../models/User.model.js";

async function Authmiddleware(req, res, next) {
  try {
    const token = req.cookies?.accessTokens;
    if (!token) {
      res.clearCookie("accessTokens", {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
      });
      return res.status(401).send({
        success: false,
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(token, config.jwt.secret);

    const user = await User.findById(decoded.id).select("-password -refreshedToken");
    if (!user) {
      res.clearCookie("accessTokens", {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
      });
      return res.status(401).send({
        success: false,
        message: "Invalid token. User not found"
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(`Error verifying the token: ${err}`);
    res.clearCookie("accessTokens", {
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    });
    res.clearCookie("refreshTokens", {
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    });

    return res.status(401).send({
      success: false,
      message: err.name === "TokenExpiredError" ? "Token expired" : "Token invalid",
      error: err.message
    });
  }
}

export { Authmiddleware };
