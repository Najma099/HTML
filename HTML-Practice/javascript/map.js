const mp = new Map();
mp.set("In", "India");
mp.set("USA","United State of America");
mp.set("MALAY","Malaysia");

//console.log(mp);
// this is not iterable on object
for(const [key,value] of mp) {
    console.log(key,':- ', value);
}