import { Router } from "express" ;
const router = Router();
import middleware from "../middleware/middleware.js";
import { Course, User } from "../db/index.js";
import handleZodError from"../utils/validateNsend.js" ;
import Schemaobj from "../utils/zodvalidate.js";
import bcrypt from "bcrypt" ;
import { accessToken, refreshToken } from "../utils/tokens.js" ;

// User Signup
router.post("/signup", async (req, res) => {
  const user = req.body;

  const response = Schemaobj.safeParse(user);
  const errorResponse = handleZodError(response, res);
  if (errorResponse) return;

  try {
    const exists = await User.findOne({ username: user.username });
    if (exists) {
      return res.status(409).json({
        ok: false,
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await User.create({
      username: user.username,
      password: hashedPassword,
    });

    const newUser = await User.findById(createdUser._id).select("-password -_id");
    if (!newUser) {
      return res.status(500).json({
        ok: false,
        message: "User was not created",
      });
    }

    return res.status(201).json({
      ok: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
});

// User Signin
router.post("/signin", async (req, res) => {
  try {
    const user = req.body;

    const response = Schemaobj.safeParse(user);
    const errorResponse = handleZodError(response, res);
    if (errorResponse) return;

    const userExists = await User.findOne({ username: user.username });
    if (!userExists) {
      return res.status(404).json({
        ok: false,
        message: "User doesn't exist",
      });
    }

    const isPasswordCorrect = await userExists.checkPassword(user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        ok: false,
        message: "Password is incorrect. Please try again",
      });
    }

    const access_token = accessToken({
      id: userExists._id,
      username: userExists.username,
      role: "User",
    });

    const refresh_token = refreshToken({
      id: userExists._id,
      username: userExists.username,
      role: "User",
    });

    userExists.refreshToken = refresh_token;
    await userExists.save();

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    };

    res
      .status(200)
      .cookie("accessToken", access_token, options)
      .cookie("refreshToken", refresh_token, options)
      .json({
        ok: true,
        message: `${userExists.username} logged in successfully`,
        accessToken: access_token,
        refreshToken: refresh_token,
      });
  } catch (err) {
    console.log(`Error while signing in: ${err}`);
    res.status(500).json({
      ok: false,
      message: err?.message || "Unexpected error during signin",
      err,
    });
  }
});

// Get all Courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find({});
    return res.status(200).json({
      ok: true,
      message: "All available courses",
      courses,
    });
  } catch (err) {
    console.error(`Error while fetching courses: ${err}`);
    res.status(500).json({
      ok: false,
      message: err?.message || "Unexpected error occurred while getting courses",
    });
  }
});

// Purchase a Course
router.post("/courses/:courseId", middleware, async (req, res) => {
  try {
    const user = req.user;
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        ok: false,
        message: "Invalid Course ID",
      });
    }

    await User.findByIdAndUpdate(
      user._id,
      { 
        $addToSet: { Courses: courseId }
      },
      { new: true }
    ).select("-password -refreshToken");

    res.status(200).json({
      ok: true,
      message: "Course purchased successfully!",
    });
  } catch (err) {
    console.error(`Error purchasing the course: ${err}`);
    res.status(400).json({
      ok: false,
      message: err?.message || "Unexpected error during course purchase",
      err,
    });
  }
});

// Get Purchased Courses
router.get("/purchasedCourses", middleware, async (req, res) => {
  try {
    const user = req.user;
    const dbUser = await User.findById(user._id).populate("Courses", "-__v");

    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        message: "Could not fetch user data from database",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Successfully fetched purchased courses",
      courses: dbUser.Courses,
    });
  } catch (err) {
    console.error(`Error while fetching purchased courses: ${err}`);
    res.status(500).json({
      ok: false,
      message: err?.message || "Unexpected error while fetching purchased courses",
      err,
    });
  }
});

export default router;
