function cleanFile() {
   const fs = require('fs');
   let data = fs.readFile('/Users/najmakhatun/Code/HTML/Development/week2/wikipedia.json', 'utf-8', (err, data) => {
        if(err) {
            console.log("error earding the file", err);
            throw err;
        }

        const newdata = data.replace(/\s+/g, " ").trim();
        fs.writeFile('/Users/najmakhatun/Code/HTML/Development/week2/wikipedia.json', newdata, (err) => {
            if(err) {
                console.log("Error writing file:", err);
                throw err;
            }
            console.log("File cleaned and written successfully!");
            console.log(newdata);
        })

    })
    
}
cleanFile();