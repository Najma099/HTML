enum Directions{
  up="up",
  down="down",
  top="top",
  bottom="bottom"
}

function fun(KeyPressed :Directions) {
  if (KeyPressed == Directions.up)
    console.log("up");
};
console.log(Directions.down);