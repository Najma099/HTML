const express = require("express");
const app = express();
const zod = require("zod");

const schema = zod.object({
  kidney: zod.array(zod.number()),
});

app.post("/t", (req, res) => {
  const response = schema.safeParse(req.body);

  if (!response.success) {
    return res.status(400).send({
      message: "Invalid input",
      error: response.error.format(),
    });
  }

  res.send({ response: response.data });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
