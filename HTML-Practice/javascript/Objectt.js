class Fruit {
    constructor(name, color, taste) {
        this.name = name;
        this.color = color;
        this.taste = taste;
    }

    describe() {
        return `The ${this.name} is ${this.color} and tastes ${this.taste}.`;
    }

    isSweet() {
        return this.taste.toLowerCase() === 'sweet';
    }
}

const apple = new Fruit('Apple', 'red', 'sweet');
console.log(apple.describe());
console.log(apple.isSweet());

const lemon = new Fruit('Lemon', 'yellow', 'sour');
console.log(lemon.describe());
console.log(lemon.isSweet());
