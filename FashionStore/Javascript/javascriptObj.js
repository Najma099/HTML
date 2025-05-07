const data = {
  name: "najma",
  roll: 73
};
const JsonData = JSON.stringify(data);
console.log(JsonData);
console.log(typeof JsonData)

const newjsObj = JSON.parse(JsonData);
console.log(newjsObj);