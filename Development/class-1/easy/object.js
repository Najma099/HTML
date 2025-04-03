const details = [
    {
        namee : "najma",
        roll_no: 64,
        gender : "female",
        metadata: {
            country:"IND"
        }
    },
    {
        namee: "Shoyeb",
        roll_no: 69,
        gender : "male",
        metadata: {
            country:"IND"
        }
    }

]

for(let i = 0; i < details.length; i++) {
    if(details[i].gender == "male") {
        console.log(details[i].metadata.country);
    }
}

function sum(a, b) {
    return a + b;
}

function arithmatcs(a, b, fun) {
    const aa = fun(a, b);
    return aa;
}

let bb = arithmatcs(9,6,sum);
console.log(bb);


function delayedFun(a, time){
    setTimeout( () => {
        console.log(a);
    },time)
}

delayedFun("hello", 2000);