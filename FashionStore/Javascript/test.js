let accorName = "Najma";
// alert("Hello");

const user = new Object() 
user.id = 123;
user.name = "Sam"

arr = Object.keys(user);
//console.log(arr)


const obj = {1:"a", 2: "b"};
const obj1 = {1:"a", 2 : "b"};
const obj2 = Object.assign({}, obj, obj1)
const obj3 = {...obj,...obj1}
console.log(obj3);