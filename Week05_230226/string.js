let str = "Hello, World!";

console.log("String:", str);
console.log("Length:", str.length);

console.log("Uppercase:", str.toUpperCase());
console.log("Lowercase:", str.toLowerCase());

console.log("First character:", str[0]);
console.log("Last character:", str[str.length - 1]);

console.log("Index of 'o':", str.indexOf('o'));
console.log("Last index of 'o':", str.lastIndexOf('o'));

console.log("Slice (0 to 5):", str.slice(0, 5));
console.log("Substring (7 to 12):", str.substring(7, 12));

console.log("Replace 'World' with 'JavaScript':", str.replace("World", "JavaScript"));

let words = str.split(", ");
console.log("Split by comma:", words);

console.log("Includes 'Hello':", str.includes("Hello"));
console.log("Starts with 'H':", str.startsWith("H"));
console.log("Ends with '!':", str.endsWith("!"));