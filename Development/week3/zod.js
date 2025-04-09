const express = require('express');
const app = express();
const zod = require("zod");
app.use(express.json());
const schema = zod.array(zod.number());

app.post('/', (req, res) => {
    const kidney = req.body.kidney;
    const response = schema.safeParse(kidney);
    if(!response.success) {
        return res.status(400).json({
            message: "Invalid input",
            error: response.error.format()
        });
    }
    res.send(response);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})