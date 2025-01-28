async function getallUser() {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        console.log(data);
    }
    catch(error){
        console.log("E: ",error);
    }
}
getallUser()




function divideByZero(a, b) {
    try {
        if (b === 0) {
            throw new Error("Can't divide by 0");
        }
        console.log(a / b);
    } catch (error) {
        console.error(error.message);
    }
}

divideByZero(2, 0);
