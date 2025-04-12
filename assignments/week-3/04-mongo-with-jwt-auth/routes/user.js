const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, User } = require("../db");
const handleZodError = require("../utils/validateNsend.js");
const { Schemaobj } = require("../utils/zodvalidate");
const bcrypt = require('bcrypt');
const { accessTokens, refreshToken } = require("../utils/tokens.js");


// User Routes
router.post('/signup', async(req, res) => {
  // Implement user signup logic
    
  //Zod Validation
  const user = req.body;
  const response = Schemaobj.safeParse(user);
  const errorResponse = handleZodError(response, res);
  if (errorResponse) return;
  
  //if username already exits 
  const exits = await User.findOne({username: user.username });
  if(exits) {
    return res.status(409).send('Username Already exits');
  }
  
  //hash the password and save it in database
  try {
    const hashedPassword = await bcrypt.hash(user.password,10);
    
    const createdUser = await User.create({
      username: user.username,
      password: hashedPassword
    });
    const newuser = await User.findById(createdUser._id).select("-password -_id");
    if(!newuser) {
      res.status(500).json({
        ok:false,
        message:"User was not created "
      });
    }
    return res.status(201).json({
      ok: true,
      message: "User created successfully",
      user: newuser
    });
  }
  catch(err) {
    return res.status(500).json({
        ok: false,
        message: "Something went wrong",
        error: err.message
   });
  } 
});

router.post('/signin', async(req, res) => {
    // Implement user signup logic
  try{
    const user= req.body;
    const response = Schemaobj.safeParse(user);
    const errorResponse = handleZodError(response, res);
    if (errorResponse) return;
    
    //lets check if user exits
    const userexists = await User.findOne({ username: user.username });
    if(!userexists) {
      return res.status(404).send({
        ok:false,
        message: "User doesn't exits"
      });
    }
    
    //match the hashedPassword
    const checkPass = await userexists.checkPassword(user.password);
    if(!checkPass) {
      return res.status().send({
        ok: false,
        message:"Password is incorrect. Please try again"
      });
    }
      
    //access token
    let accesstoken = accessTokens({
      id: userexists._id,
      username: userexists.username,
      role: "user"
    });
    
    let refreshtoken = refreshToken({
      id: userexists._id,
      username: userexists.username,
      role: "user"
    });
    userexists.refreshToken = refreshtoken;
    await userexists.save();
    
    const options= {
      httpOnly: true,
      secure: true,
      sameSite: "lax"
    }
    
    res
      .status(200)
      .cookie("accesstoken", accesstoken, options)
      .cookie("refreshtoken", refreshtoken, options)
      .json({
        ok: true,
        message: `${userexists.username} logged in successfully`,
        accesstoken,
        refreshtoken
      })
  }
  catch(err) {
    console.log(`Error while Signin ${err}`);
    res.status(500).send({
      ok: false,
      message: err?.message || "Something unexpected happened",
      err
    });
  }
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router