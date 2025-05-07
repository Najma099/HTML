//Immutable
let a = "stringgg";
a[0] = 'K';
console.log(a);
console.log(typeof (a));

//Mutable
let b = {
  name: "Najma"
}
console.log(b);
b.id = 123;
console.log(b);
delete b.id;
console.log(b);