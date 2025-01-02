const mp = new Map();
mp.set("In", "India");
mp.set("USA","United State of America");
mp.set("MALAY","Malaysia");

//console.log(mp);
// this is not iterable on object just on map
for(const [key,value] of mp) {
    //console.log(key,':- ', value);
}

//for-of given the value
const arr= [1,2,3,4];
for(const key of arr) {
    console.log(key);
}

// for-in gives the idx
for(const key in arr) {
    console.log(arr[key]);
}