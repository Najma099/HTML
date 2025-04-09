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
                return reject(err);
            }
            console.log("File read successfully!");
            data += "Hello World";
            fs.writeFile('/Users/najmakhatun/Code/HTML/Development/week2/wikipedia.json', data, (err) => {
                if(err) {
                    console.log("Error writing file:", err);
                    return reject(err);
                }
                console.log("File is written successfully!");
                console.log(data);
                resolve(data);
            })
    
        })
       // resolve(data);
    })
}

let a = 0;
for(let j= 0; j < 100000; j++) {
    console.log(a);
    a++;
}
