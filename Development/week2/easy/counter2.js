let a = 0;
function counter() {
    a++;
    console.log(a);
    setTimeout(counter,10);
}
counter();