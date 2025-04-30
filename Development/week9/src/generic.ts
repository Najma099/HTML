function getFirstNumber<T>(arr: T[]) {
  return arr[0];
};
const ele = getFirstNumber<string>(["Najma", "Khatun"]);
console.log(ele);