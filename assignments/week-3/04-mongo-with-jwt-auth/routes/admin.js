const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const Schemaobj = require("../utils/zodvalidate");
const handleZodError = require("../utils/validateNsend");
const bcrypt = require('bcrypt');
const { accessToken,refreshToken } = require("../utils/tokens");
const {AdminSchema ,  CourseSchema} = require("../db/index.js")
const { Course, User } = require("../db");
// Admin Routes


router.post('/signup', async(req, res) => {
    // Implement admin signup logic
  const user = req.body;
  const response = Schemaobj.safeParse(user);
  const result = handleZodError(response, res);
  if (result) return;
  
  //if the user exists in database
  const newUser = await Admin.findOne({username: user.username });
  if(newUser) {
    return res.status().send({
      ok: false,
      message: "The Username already exists"
    })
  };
  
  //hash the password
  try{
    const hashedpass = bcrypt.hash(password);
    const userdb = await Admin.create({
      username: user.username,
      password: hashedpass
    })
    const find = await Admin.findById(userdb._id).select("-password -_id");
    if(!find) {
      return res.status().send({
        ok: false,
        message: "Error in creating Admin"
      })
    }
    res.status(200).send({
      ok: true,
      message:"Admin created Successfully",
      find
    })
  }
  catch(err) {
    console.error(`Unsuccess in creating Admin ${err}`);
    res.send({
      ok: false,
      message: err?.message || "Internal server issue"
    })
  }
});


router.post('/signin', async(req, res) => {
    // Implement admin signin logic
  const user = req.body;
  const response = Schemaobj(user);
  const responseError = handleZodError(response, res);
  if (responseError) return;
  
  try{
    const newAdmin = await Admin.findOne({ username: user.username });
    if(!newAdmin) {
      return res.status().send({
        ok: true,
        message: "Invalid username. No such username exits"
      })
    }
    
    //password matching
    const pass = await newAdmin.checkPassword(user.password);
    if(!pass) {
      return res.status.send({
        ok: false,
        message:"invalid credencials. Please try again!"
      })
    }
    
    const accesstoken = accessToken({
      id: newAdmin._id,
      username: newAdmin.username,
      role: "Admin"
    });
    const refreshtoken = refreshToken({
      id: newAdmin._id,
      username: newAdmin.username,
      role: "Admin"
    });
    
    newUser.refreshTokens = refreshtoken;
    await newUser.save();
    res.status().send({
      ok: true,
      message: "Successfully Signed in!"
    })
  }
  catch(err) {
    console.error(`Error while signing in! ${err}`);
    res.status().send({
      ok: false,
      message: err?.message || "Couldnt signin in due to server issue",
      err
    });
  }
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
  const data = req.body;
  const newCourse = await Course.findOne({ data });
  if(newCourse) {
    return res.status().send({
      ok: false,
      message: "This Course already exits in the database!"
    });
  };
  
  const coursedb = await Course.create(data);
  const find = await Course.findById(coursedb._id);
  if(!find) {
    return res.status().send({
      ok: false,
      message:"Couldnt create the Course due to server down!"
    })
  }
  res.status(200).send({
    ok: true,
    message: "Course created Successfully"
  })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
  try{
    const course = await Course.find({});
    res.status().json({
      ok: true,
      message: "Successfully fetched all the courses:",
      course
    })
  }
  catch(err) {
    res.status().send({
      ok: false,
      message: err?.message || "Couldn't fetched all the course"
    })
  }
});

module.exports = router;