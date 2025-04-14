import express from 'express';
const app = express();

app.use(express.json());
app.use('/sum', (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send("Invalid input: both 'a' and 'b' must be numbers");
  }
  res.send(`${a + b}`);
})

app.listen(3000,() => {
  console.log('Server is running at port 3000');
})