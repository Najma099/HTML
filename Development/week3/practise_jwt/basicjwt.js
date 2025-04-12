const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const jwtpassword = "jwtSecret";

const admin = {
  username: "najma",
  password: '123abc'
}

app.use(express.json());

function middlewareuser (req, res) {
  const token = req.headers['authenticate'] && req.headers['authenticate'].split(' ')[1];
  if(!token) {
    return res.status(403).send("Token is not present");
  }
  try{
    const decoded = jwt.verify(token, jwtpassword);
    res.user = decoded;
    next();
  }
  catch(err) {
    return res.status(403).send('Token is invalid or expired');
  }
}
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if(username === admin.username && password === admin.password) {
    const token = jwt.sign({ username, password }, jwtpassword, { expiresIn: '15m' });
    res.json({
      message: "Login succesful",
      token
    })
  }
  else {
    res.status(403).json({ message: "Invalid credencials" });
  }
})

app.post('protected', middlewareuser, (req, res) => {
  res.send({ message: `hello ${req.user.name}, you are inside protected route!!` });
})

app.listen(3000, () => {
  console.log("Server is running at port 3000");
})