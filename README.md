1️⃣ What is the difference between var, let, and const?
Answer: In JavaScript, var, let, and const are used to declare variables, but they behave differently.

var is the old way of declaring variables. It is function scoped and can be redeclared and updated. Because of this, it can sometimes cause unexpected problems in large programs.

let was introduced in ES6. It is block scoped, which means it only works inside the block where it is defined (like inside {}). It can be updated but cannot be redeclared in the same scope.

const is also block scoped like let, but its value cannot be reassigned after it is declared. It is usually used when the value should stay constant.
