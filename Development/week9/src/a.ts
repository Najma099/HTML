const x: number = 1;
//console.log(x);

// problem-1
function greet(str: string) {
  console.log("welcome" + str);
};
greet("Najma");

//problem-2(SUm)
function sum(a:number, b: number):number{
  return a + b;
}
console.log(sum(3, 55));

//problem-3
function islegal(a:number):boolean{
  if (a >= 18) return true;
  return false;
};
islegal(55);

function run1sec(fn: () => void) {
  setTimeout(fn, 1000);
};
run1sec(() => {
  console.log("HIIIII");
});
