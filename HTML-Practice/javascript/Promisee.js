const promise = new Promise(function (resolve, reject) {
    const success = true; 
    if (success) {
        resolve("Your order will be delivered on Saturday"); 
    } else {
        reject("Delay!!");
    }
})
    .then((msg) => {
        console.log(msg);
    })
    .catch((err) => {
        console.error(err); 
    })
    .finally(() => {
        console.log("Thank you for shopping");
    });


    