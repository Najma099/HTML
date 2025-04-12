const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
  const user = req.body;
  try{
    const exists = User.exists(user);
    if(exists)
      return res.send('User already exists')
    await User.create(user);
    res.send("User is created successfully");
  }catch(err) {
    res.send("User Couldnt be created");
  }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    try{
      const course = await Course.find({});
      res.json(course);
    }
    catch(err) {
      res.send("Error fetching teh courses");
    }
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
  const courseId = parseInt(req.params.courseId);
  const user = req.user;
  
  try{
    if(!user.coursePurchased.includes(courseId)) {
      user.coursePurchased.push(courseId);
      await user.save();
      res.send("Course Purchased successfull");
    }
    else {
      res.send("Course Already purchased!!!");
    }
  }
  catch(err) {
    res.status(500).send("Error purchasing the Course");
  }
    
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
  try{
    const user = res.user;
    const courses = await Course.find({
      courseId: { $in: user.coursePurchased }
    });
    res.json(courses);
  }
  catch(err) {
    res.send("Failled to fetch purchased courses");
  }
  
  
});

module.exports = router