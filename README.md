1️⃣ What is the difference between var, let, and const?
Answer: In JavaScript, var, let, and const are used to declare variables, but they behave differently.

var is the old way of declaring variables. It is function scoped and can be redeclared and updated. Because of this, it can sometimes cause unexpected problems in large programs.

let was introduced in ES6. It is block scoped, which means it only works inside the block where it is defined (like inside {}). It can be updated but cannot be redeclared in the same scope.

const is also block scoped like let, but its value cannot be reassigned after it is declared. It is usually used when the value should stay constant.

2️⃣ What is the spread operator (...)?
Answer: The spread operator is used to expand elements of an array or object. It allows us to copy or combine data easily.
For example, we can copy an array or merge multiple arrays together.

3️⃣ What is the difference between map(), filter(), and forEach()?
Answer:
These are array methods used to work with elements in an array.
map():
map() creates a new array by applying a function to each element of the original array.
filter():
filter() creates a new array with elements that match a specific condition.
forEach():
forEach() runs a function for each element in the array, but it does not return a new array.

4️⃣ What is an arrow function?
An arrow function is a shorter way to write functions in JavaScript. It was introduced in ES6 and makes the code cleaner and easier to read.

5️⃣ What are template literals?
Template literals are used to create strings in a more flexible way. They use backticks ( ) instead of single or double quotes.
They allow us to insert variables directly inside a string using ${}.
