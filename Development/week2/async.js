// setTimeout is async fuction .... it does not block the code
// it allows the code to run and then execute the function after the time is over

function print(a, time) {
    setTimeout(() => {
        console.log(a);
    }, time)
}
print("hllow",900);
console.log("HYEEE");
