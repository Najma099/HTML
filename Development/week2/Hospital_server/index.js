let users = [{
    namee: "John Doe",
    kidney: [{
        isHealthy: true
    }]
}]

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.get('/', (req, res) => {
    let numkidney = users[0].kidney.length;
    let healthyKidney = users[0].kidney.filter(kidney => kidney.isHealthy === true).length;
    let unhealthyKidney = numkidney - healthyKidney;
    res.send(`User ${users[0].namee} has ${numkidney} kidneys, ${healthyKidney} are healthy and ${unhealthyKidney} are unhealthy.`);
})

app.post('/', (req, res) => {
    const isHealthy = req.body.isHealthy;
    if (typeof isHealthy !== 'boolean') 
       return res.status(400).send("is healthy must be boolean (true/false)");
    users[0].kidney.push({
        isHealthy: isHealthy
    });
    res.send("Done!");
})

app.put('/', (req, res) => {
    let unhealthy = users[0].kidney.filter(kidney => kidney.isHealthy === false).length;
    if(unhealthy == 0) 
        return res.send("NO unHealthy Kidney To update");
    for(let i = 0; i < users[0].kidney.length; i++) {
        users[0].kidney[i].isHealthy = true;
    }
    res.send("Damaged Kidney updated to healthy");
})

app.delete('/', (rq, res) => {
    let unhealthy = users[0].kidney.filter(kidney => kidney.isHealthy === false).length;
    if(unhealthy == 0) 
        return res.status(411).send("NO unHealthy Kidney To Remove");
    let healthyKid = users[0].kidney.filter(kidney => kidney.isHealthy === true);
    users[0].kidney = healthyKid;
    res.send("All damaged kidney are removed");
})

app.listen(port);