const user = {
  "id": 2374,
  "name": "Luna Sparks",
  "email": "luna.sparks@example.com",
  "isActive": true,
  "createdAt": "2025-06-11T10:52:30Z",
  "roles": ["admin", "editor"],
  "profile": {
    "age": 27,
    "city": "Bangalore",
    "languages": ["English", "Hindi", "Kannada"]
  },
  "settings": {
    "theme": "dark",
    "notifications": {
      "email": true,
      "sms": false
    }
  },
  "lastLogin": null
}

Object.keys(user).forEach((key) => {
  console.log(user[key]);
});
console.log(Object.keys(user).length);

delete user.idd;
Object.keys(user).forEach((key) => {
  console.log(user[key]);
});
console.log(Object.keys(user).length);

if('salary' in user) {
  console.log(`data is present ${user[salary]}`);
}
else {
  console.log("Data is not present");
};

for(const[key, value] of Object.entries(user)) {
  console.log(`${key}---> ${value}`)
}
