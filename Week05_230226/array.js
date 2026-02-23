let arr = [1, 2, 3, 4, 5];

console.log("Array:", arr);
console.log("Length:", arr.length);

console.log("First element:", arr[0]);
console.log("Last element:", arr[arr.length - 1]);

arr.push(6);
console.log("After push 6:", arr);

arr.pop();
console.log("After pop:", arr);

arr.unshift(0);
console.log("After unshift 0:", arr);

arr.shift();
console.log("After shift:", arr);

console.log("Index of 3:", arr.indexOf(3));

let sliced = arr.slice(1, 4);
console.log("Slice (1 to 4):", sliced);

arr.splice(2, 1, 99);
console.log("After splice (replace index 2 with 99):", arr);

console.log("Joined as string:", arr.join("-"));

arr.forEach((item, index) => {
    console.log(`Item at ${index}: ${item}`);
});

let doubled = arr.map(item => item * 2);
console.log("Mapped (doubled):", doubled);

let even = arr.filter(item => item % 2 === 0);
console.log("Filtered (even):", even);