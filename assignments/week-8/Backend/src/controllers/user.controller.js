import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";
import { accessToken, refreshedToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";
import config from "../../config";
import { UpdateSchema , PasswordSchema} from "../ZodSchema/user.schema.js";

export const SignUp = async (req, res) => {
  try {
    const find = await User.findOne({ username: req.body.username });
    if (find) {
      return res.status(400).send({
        success: false,
        message: 'Username already exists. Please enter a different username!',
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const createdUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const newUser = await User.findById(createdUser._id).select("-password -refreshedToken");

    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: "User was not created. Something went wrong",
      });
    }

    res.status(201).json({
      success: true,
      message: "User is created successfully!",
      newUser,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const SignIn = async (req, res) => {
  try {
    const existUser = await User.findOne({ username: req.body.username });
    if (!existUser) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials. Username doesn't exist.",
      });
    }

    const checkPass = await existUser.checkPassword(req.body.password);
    if (!checkPass) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials. Incorrect password.",
      });
    }

    const accessTokens = accessToken({
      id: existUser._id,
      username: existUser.username,
    });

    const refreshedTokens = refreshedToken({
      id: existUser._id,
      username: existUser.username,
    });

    existUser.refreshedToken = refreshedTokens;
    await existUser.save();

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    };

    res
      .status(200)
      .cookie("accessTokens", accessTokens, options)
      .cookie("refreshedTokens", refreshedTokens, options)
      .json({
        success: true,
        message: `${existUser.username} logged in successfully`,
        accessToken: accessTokens,
        refreshedToken: refreshedTokens,
      });
  } catch (err) {
    console.error(`Signin Error: ${err}`);
    res.status(500).json({
      success: false,
      message: err?.message || "Unexpected error during signin",
      err,
    });
  }
};

export const RefreshedToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshedTokens;
    if (!refreshToken) {
      return res.status(401).send({
        success: false,
        message: "Refreshed Token not found. Please login again."
      });
    }

    const decoded = jwt.verify(refreshToken, config.jwt);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired tokens."
      });
    }

    const newAccessToken = accessToken({ id: decoded.id, username: decoded.username });
    res.status(200).json({
      success: true,
      message: "AccessToken generated successfully!",
      accessToken: newAccessToken
    });
  }
  catch (err) {
    console.error("Error during refresh token:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const ChangeDetails = async (req, res) => {
  try {
    const newInfo = UpdateSchema.safeParse(req.body);
    if (!newInfo.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid data format",
        issues: newInfo.error.errors
      });
    }
    const updatedUser = await User.findByIdAndUpdate(req.user._id, newInfo.data, { new: true });
    if (!updatedUser) {
      return res.status(500).json({
        success: false,
        message: "User not found or update failed",
      });
    }
    res.status(200).send({
      success: true,
      message: "The details were updated successfully",
    });
  }
  catch (err) {
    console.log(`Error while updating the details: ${err}`);
    res.status(500).json({
      success: false,
      message: err?.message || "Unexpected error occurred while changing the data."
    });
  }
};

export const ChangePassword = async (req, res) => {
  try {
    const password = PasswordSchema.safeParse(req.body);
    if (!password.success) {
      return res.status(400).json({
        success: false,
        message: `Invalid password format`
      });
    }

    const user = req.user;
    const checkPass = await user.checkPassword(req.body.oldpassword);
    if (!checkPass) {
      return res.status(401).json({
        success: false,
        message: "Old password doesn't match."
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updateUser = await User.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true });
    if (!updateUser) {
      return res.status(500).json({
        success: false,
        message: "Unexpected error while changing the password"
      });
    }
    res.status(202).json({
      success: true,
      message: "Password changed successfully"
    });
  }
  catch (err) {
    console.log(`Error while updating the password: ${err}`);
    res.status(500).json({
      success: false,
      message: err?.message || "Unexpected server error while updating the password"
    });
  }
};

export const GetUsers = async (req, res) => {
  try {
    const filter = req.query.filter?.trim() || '';
    if (!filter) {
      const users = await User.find({}).select("-password -refreshedToken");
      return res.status(200).json({
        users: users,
        success: true,
        message: "All users retrieved."
      });
    }
    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: 'i' } },
        { lastName: { $regex: filter, $options: 'i' } }
      ]
    }).select("-password -refreshedToken");
    res.status(200).json({
      success: true,
      message: `Found ${users.length} users`,
      users: users
    });
  }
  catch (err) {
    console.log(`Error while fetching the data: ${err}`);
    res.status(500).json({
      success: false,
      message: err?.message || "Internal server error, couldn't fetch the data"
    });
  }
};
