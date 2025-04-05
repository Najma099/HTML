function promiseExanomale() {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            console.log('Hellow World');
            resolve("HIIIIIIIIII");
        },100);
    })
}
async function main() {
    let p =  promiseExanomale();
    let resolved = await p;
    console.log(p);
    p.then((a) => {
        console.log("Promise resolved with value: ", a);
        return a;
    }).then ((a) => {
        console.log("Promise resolved with second value: ", a);
    }).catch( () => {
        console.log("Promise rejected");
    }
    )
}

main();