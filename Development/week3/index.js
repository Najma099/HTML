const express = require('express');
const app = express();
app.use(express.json());

function Usermiddleware(req, res, next) {
    const username = req.headers["username"];
    const password = req.headers["password"];

    if(!(username == 'Najma' && password == "pass")) {
        return res.status(401).send("Unauthorized");
    }
    next();
}
function Kidneymiddleware(req, res, next) {
    const kidneyId = req.query.kidneyId;
    if(!(kidneyId == 1 || kidneyId == 2)) {
        return res.status(401).send("Invalid kidneyId");
    }
    next();
}


app.get('/kidney-checkup', Usermiddleware, Kidneymiddleware, (req, res) => {
    res.send("Kidney checkup Done!!");
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})