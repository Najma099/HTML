class InsuffiecientBal extends Error {
    constructor(message) {
        supper(message);
        this.name = "Insufficient balance";
    }
}
let withdraw = 1000;
let balance = 800;
try {
    if(withdraw > balance) {
        throw new InsuffiecientBal("Insufficient Balance");
    }
    else {
        console.log("Withdraw Successful");
    }
} catch (error) {
    console.log(error.name);
    console.log(error.message);
}