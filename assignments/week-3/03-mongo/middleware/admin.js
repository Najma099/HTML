// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. 
    // Check readme for the exact headers to be expected
  let username = req.headers['username'];
  let password = req.headers['password'];
  try{
    const admin = await Admin.findOne({ username, password });
    if(!admin) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }
    req.admin = admin;
    next();
  }
  catch(err) {
    res.send("Internal server error");
  }
}

module.exports = adminMiddleware;