const fs = require("fs");

fs.readFile("/Users/najmakhatun/Code/HTML/Development/week2/wikipedia.json", "utf8", (err, data) => {
    // if (err) {
    //     console.error("Error reading file:", err);
    //     return;
    // }

    console.log("Raw File Content:", data); // Debugging output
    console.log("File read successfully!");

    try {
        const jsonData = JSON.parse(data.trim());
        console.log("Parsed JSON:", jsonData);
    } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
    }
});
