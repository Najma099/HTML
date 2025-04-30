interface person{
  name: string,
  age: number,
  greet(phrase: string): void;
};

class Employeee implements person {
  name: string;
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  };
  
  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
};

const e = new Employeee("Najma", 21);
console.log(e.name);