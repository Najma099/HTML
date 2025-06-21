type User2 = {
  name: string;
  age: number;
  email: string;
};

const users = new Map<string, User2>();
users.set('uty', {name: "abc", age: 43, email: 'abc@gmail.com'})
users.set('lty', {name: "kyu", age: 34, email: 'otre@gmail.com'})

const getuser = users.get("lty");
console.log(getuser);

