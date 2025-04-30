interface User{
  firstName: string,
  lastName: string,
  email ?: string, //email is optional arguments
  age: number
};

function isLegal(user: User):boolean {
  if (user.age >= 18)
    return true;
  return false;
};
const sol : boolean = isLegal({
  firstName: "Najma",
  lastName: "Khatun",
  age: 21
});
console.log(sol);