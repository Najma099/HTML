async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. 
    // Check readme for the exact headers to be expected
    let username = req.headers['username'];
    let password = req.headers['password'];
    try{
      const user = await User.findOne({ username, password });
      if(!user) {
        return res.send("User is incorrect")
      }
      req.user = user;
      next();
    }
    catch(err) {
      res.send("Internal server error");
    }
}

module.exports = userMiddleware;