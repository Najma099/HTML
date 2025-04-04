let fs = require('fs');
function writeFile() {
   fs.readFile('/Users/najmakhatun/Code/HTML/Development/week2/wikipedia.json', 'utf-8', (err, data) => {
        if(err) {
            console.log("Error reading file:", err);
            return;
        }
        console.log("File read successfully!");
        console.log(data);
        // data += "Hello World";
        // console.log(data);
    });
}
writeFile();