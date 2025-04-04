let user = {
    name: "John",
    age: 30,
    isAdmin: true,
    "likes birds": true
}

let user2 = JSON.stringify(user);
let user3 = JSON.parse(user2);
console.log(user3["isAdmin"]);