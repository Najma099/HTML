
import { Router } from "express";
import middleware from "../middleware/middleware.js";
import Schemaobj from "../utils/zodvalidate.js";
import handleZodError from "../utils/validateNsend.js";
import bcrypt from 'bcrypt';
import { accessToken, refreshToken } from "../utils/tokens.js";
import { Admin, Course, User } from "../db/index.js";
const router = Router();



// Admin Signup
router.post('/signup', async (req, res) => {
  console.log(req.body);
  const user = req.body;
  const response = Schemaobj.safeParse(user);
  const result = handleZodError(response, res);
  if (result) return;

  try {
    const existingUser = await Admin.findOne({ username: user.username });
    if (existingUser) {
      return res.status(409).send({
        ok: false,
        message: "The username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdAdmin = await Admin.create({
      username: user.username,
      password: hashedPassword,
    });

    const find = await Admin.findById(createdAdmin._id).select("-password -_id");
    if (!find) {
      return res.status(500).send({
        ok: false,
        message: "Error in creating admin",
      });
    }

    res.status(200).send({
      ok: true,
      message: "Admin created successfully",
      admin: find,
    });
  } catch (err) {
    console.error(`Admin creation failed: ${err}`);
    res.status(500).send({
      ok: false,
      message: err?.message || "Internal server issue",
    });
  }
});

// Admin Signin
router.post('/signin', async (req, res) => {
  const user = req.body;
  const response = Schemaobj.safeParse(user);
  const result = handleZodError(response, res);
  if (result) return;

  try {
    const newAdmin = await Admin.findOne({ username: user.username });
    if (!newAdmin) {
      return res.status(401).send({
        ok: false,
        message: "Invalid username. No such username exists",
      });
    }

    const isPasswordMatch = await bcrypt.compare(user.password, newAdmin.password);
    if (!isPasswordMatch) {
      return res.status(401).send({
        ok: false,
        message: "Invalid credentials. Please try again!",
      });
    }

    const accesstoken = accessToken({
      id: newAdmin._id,
      username: newAdmin.username,
      role: "admin",
    });

    const refreshtoken = refreshToken({
      id: newAdmin._id,
      username: newAdmin.username,
      role: "admin",
    });

    newAdmin.refreshTokens = refreshtoken;
    await newAdmin.save();

    res
      .cookie("refreshToken", refreshtoken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      })
      .status(200)
      .send({
        ok: true,
        message: "Successfully signed in",
        accesstoken,
        refreshtoken
      });
  } catch (err) {
    console.error(`Error while signing in: ${err}`);
    res.status(500).send({
      ok: false,
      message: err?.message || "Couldn't sign in due to server issue",
    });
  }
});

// Create Course
router.post('/courses', middleware, async (req, res) => {
  const data = req.body;

  const existingCourse = await Course.findOne({ title: data.title }); // assuming 'title' is unique
  if (existingCourse) {
    return res.status(409).send({
      ok: false,
      message: "This course already exists in the database!",
    });
  }

  try {
    const newCourse = await Course.create(data);
    const find = await Course.findById(newCourse._id);
    if (!find) {
      return res.status(500).send({
        ok: false,
        message: "Couldn't create the course due to server issues!",
      });
    }
    res.status(200).send({
      ok: true,
      message: "Course created successfully",
      course: find,
    });
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: err?.message || "Internal error while creating course",
    });
  }
});

// Get All Courses
router.get('/allcourses', middleware, async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({
      ok: true,
      message: "Successfully fetched all courses",
      courses,
    });
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: err?.message || "Couldn't fetch courses",
    });
  }
});

export default router;
