const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
app.use(express.json());

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
  const username = req.headers['username'];
  const password = req.headers['password'];
  try{
    const admin = await Admin.findOne({username, password})
    if(admin) {
      return res.send("Admin already exists");
    }
    await Admin.create({ username, password });
    res.send('Admin created successful');
  }catch(err) {
    res.send('Error creating admin');
  }
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
  const course = req.body;
  try{
    const exists = await Course.exists(course);
    if (exists)
      return res.send('Course alredy exists');
    await Course.create(course);
    res.send("Course Created Succesfully");
  }
  catch(err) {
    res.send("problem creating course");
  } 
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    try{
      const course = Course.find({});
      res.json(course);
    }
    catch(err) {
      res.send('Error reading the data');
    }
});

module.exports = router;