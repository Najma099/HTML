try {
        const jsonData = JSON.parse(data);
        console.log("Parsed JSON:", jsonData);
    } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
    }