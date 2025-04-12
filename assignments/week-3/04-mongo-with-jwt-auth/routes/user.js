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

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    try{
      const course = await Course.find({});
      return res.status().json({
        ok: true,
        message: "All the available Courses",
        course
      });
    }
    catch(err) {
      concole.log(`Error while fetching the courses`)
      res.status().json({
        ok:false,
        message: err?.message || "Unexpcted error occurred while getting all the available courses"
      })
    }
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
  try{
    const user = req.user;
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if(!course) {
      return res.status(500).send({
        ok: false,
        message: "Invalid CourseId"
      })
    } 
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $addToset: {
          Courses: courseId
        }
      },
      {
        new: true,
      }
    ).select("-password -refreshToken"); 
    
    res.status(200).send({
      ok: true,
      message: "Course Purchesed Successfully!!!"
    })
  }
  catch(err) {
    console.error(`Error purchasing the data${err}`);
    res.status(400).send({
      ok: false,
      message: err?.message || "Unexpected error while purchasing the course",
      err
    })
  }  

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  try {
    const user = req.user;

    const dbUser = await User.findById(user._id).populate("Courses", "-__v");
    
    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        message: "Error while fetching data from database!"
      });
    }

    res.status(200).json({
      ok: true,
      message: "Successfully got all the purchased courses",
      courses: dbUser.courses
    });

  } catch (err) {
    console.error(`Error while fetching purchased courses: ${err}`);
    res.status(500).json({
      ok: false,
      message: err?.message || "Unexpected error while fetching all the purchased data",
      err
    });
  }
});

module.exports = router