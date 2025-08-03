// let arr = new Array(-3);
// console.log(arr[-1]);

let data = new Date();
console.log(data.getUTCFullYear());

//it round it off to next month if its not valid....
let info = new Date("2025-02-30");
console.log(info.getDate());

info.setMilliseconds(9);
console.log(info.getMilliseconds());

console.log(info.toString());
console.log(info);