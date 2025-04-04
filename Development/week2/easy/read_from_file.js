let fs = require('fs');
readFile();
async function readFile() {
    let data = await promise();
    console.log(data);
}

function promise() {
    return new Promise((resolve, reject) => {
        fs.readFile('/Users/najmakhatun/Code/HTML/Development/week2/wikipedia.json', 'utf-8', (err, data) => {
            if(err) {
                console.log("Error reading file:", err);
                reject(err);
            }
            console.log("File read successfully!");
            resolve(data);
        })
       // resolve(data);
    })
}

let a = 0;
for(let j= 0; j < 100000; j++) {
    console.log(a);
    a++;
}
