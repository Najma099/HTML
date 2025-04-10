const queryString = "?name=shoyeb&age=93&country=India";

const url = new URLSearchParams(queryString);

console.log(url.get("name"));
console.log(url.get("age"));
console.log(url.get("country"));

