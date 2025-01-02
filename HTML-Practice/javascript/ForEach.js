const arr = [1, 2, 3];
// const newArr = arr.map(value => value * 2);
// console.log(newArr); 
// console.log(arr);  


// arr.forEach((value, index, array) => {
//     array[index] = value * 2;
// });
// console.log(arr);



// let brr = arr.map( (num) => {
//     return num * 2;
// })

// console.log(brr);

const newNum = arr
            .map( (num) => {
                return num * 10;
            })
            .map( (num) => {
                return num + 1;
            });
// console.log(newNum);




const shoppingCart = [
    {
        itemName: "js course",
        price: 2999
    },
    {
        itemName: "py course",
        price: 999
    },
    {
        itemName: "mobile dev course",
        price: 5999
    },
    {
        itemName: "data science course",
        price: 12999
    },
]


const price = shoppingCart.reduce( (acc,iteam) => acc + iteam.price,0);
console.log(price);