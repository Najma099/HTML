const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Admin, Course, User } = require("../db");
const zod = require('zod'); 
const schema = zod.object ({
  username: zod.String().min(6).max(10),
  password: zod.String()
})
const bcrypt = require('bcrypt');
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    
  //Zod Validation
  const user = req.body;
  if(!user) {
    return res.status(400).send("User data is missing");
  }
  const response = schema.safeParse(user);
  if(!response.success) {
    const errordetail = response.error.errors.map(err => {
      return {
        field: err.path[0],
        message: err.message
      };
    });
    return res.status(400).json({
      message:'Validation fail',
      errors: errordetail
    })
  };
  
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

router.post('/signin', (req, res) => {
    // Implement user signup logic
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