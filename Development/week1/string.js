let str = "hellllllOOOOTrtw ppp  ";
console.log(str.length);
let arr = str.split(" ");
for(let i = arr.length -1; i >= 0; i--) {
    console.log(arr[i]);
}
console.log(str.trim());
console.log(str.toLowerCase());
console.log(str.toUpperCase());
console.log(str.slice(0,8));
console.log(str.includes('O'));
console.log(str.lastIndexOf('l'));
