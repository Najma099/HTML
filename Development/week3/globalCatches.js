app.use((err, req, res, next) => {
  res.json({
    msg: "Sorry Something is up with our server",
  });
});
