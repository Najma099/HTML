const fs = require('fs');

function promiseexample() {
    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        //     console.log("Hellowwww");
        //     resolve('heee');
        // },100)
        let data = fs.readFileSync('/Users/najmakhatun/Code/HTML/Development/week2/wikipedia.json', 'utf8');
        resolve(data);
    })
}
//async before a function means it will always return a promise , in order to use async function we need to use await
// await is used to wait for the promise to be resolved
// async function is used to make the function asynchronous

async function main() {
    const result = await promiseexample();
    console.log(result);
}
main();
console.log("uUUUUUUUUjj");