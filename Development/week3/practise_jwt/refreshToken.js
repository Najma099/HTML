// Middleware to verify JWT token
function authenticate(req, res, next) {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Store the user info
    next(); // Allow access to the next handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token!" });
  }
}

// Middleware to verify Refresh Token
function authenticateRefreshToken(req, res, next) {
  const refreshToken = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!refreshToken) {
    return res.status(403).json({ message: "No refresh token provided!" });
  }

  try {
    const decoded = jwt.verify(refreshToken, SECRET);
    req.user = decoded; // Store the user info
    next(); // Allow access to the next handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired refresh token!" });
  }
}

// Dummy refresh token store (In real apps, store this in DB)
let refreshTokens = [];  // This will hold our refresh tokens temporarily

// LOGIN route (Issue both access and refresh tokens)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === admin.username && password === admin.password) {
    // Create access token (expires in 15 minutes)
    const accessToken = jwt.sign({ username }, SECRET, { expiresIn: '15m' });
    // Create refresh token (expires in 30 days)
    const refreshToken = jwt.sign({ username }, SECRET, { expiresIn: '30d' });

    // Save the refresh token (in real life, save to DB or Redis)
    refreshTokens.push(refreshToken);

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken
    });
  } else {
    res.status(403).json({ message: "Invalid credentials" });
  }
});

// Route to get new access token using refresh token
app.post('/token', authenticateRefreshToken, (req, res) => {
  const refreshToken = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Invalid refresh token!" });
  }

  // Generate new access token
  const accessToken = jwt.sign({ username: req.user.username }, SECRET, { expiresIn: '15m' });
  res.json({
    accessToken
  });
});

// Protected route
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you're inside! 🎉` });
});
