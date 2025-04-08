const express = require("express");
const app = express();
const port = 3000;

// app.get("/route-handler", (req, res) => {
//     res.json(
//         {
//             name:"NAjma Khatun",
//             age: 21,
//             country: "INDIA"
//         }
//     )
// })


app.use(express.json());
app.post("/new-convo", (req, res) => {
    console.log("HEADER:", req.headers);
    console.log("BODY:", req.body);
    const {
        name, message
    } = req.body;
    res.send(`Hello ${name}, your message is: ${message}`); 
})

// app.get("/new-convo", (req, res) => {
//     res.send("Hey Najma! This is /new-convo route.");
// });


app.post("/conversation", (req, res) => {
    console.log(req.headers);
    res.send("Hello from POST request");
})

// app.get("/", (req, res) => {
//     res.send("Hello World");
// })

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on http://192.168.1.100:3000");
});


  