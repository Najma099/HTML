const express = require("express");
const app = express();
const zod = require("zod");

const schema = zod.array(zod.number());
app.use(express.json());

app.post("/t", (req, res) => {
  console.log("POST / hit");
  const kidney = req.body.kidney;
  const response = schema.safeParse(kidney);
  console.log(response);
  res.send({ response });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
