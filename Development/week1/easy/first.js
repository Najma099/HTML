// var a = 1;
// console.log(a);

function greet(X, Y) {
    console.log("hello" + X + " " + Y);
}

let a = "jhj";
let b = "dhs";
greet(a,b);

let aa = 0;
for(let i = 0; i < 10; i++) {
    aa += i;
}
console.log(aa);

let ab = [22, 44, 8, 650, 3, 9, 74];
let maxx = -Infinity;
for(let i = 0; i < ab.length; i++) {
    if(ab[i] % 2 == 0) {
        console.log(ab[i]);
        maxx = Math.max(maxx, ab[i]);
    }
}
console.log(maxx);