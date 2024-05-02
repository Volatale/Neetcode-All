//* Push integers to the stack
//* Apply the correct function when you encounter anything else
//* Push the result to the stack
function reversePolishNotation(tokens) {
  //* Cuts down on repetitiveness
  //* Key : Function
  const map = new Map([
    ["+", (a, b) => a + b],
    ["-", (a, b) => a - b],
    ["*", (a, b) => a * b],
    ["/", (a, b) => Math.trunc(a / b)],
  ]);

  const stack = [];

  for (let i = 0; i < tokens.length; i++) {
    //* Check if its NOT an operator, in which case just push the int to the stack
    if (!map.has(tokens[i])) {
      stack.push(parseInt(tokens[i]));
    } else {
      const num1 = stack.pop();
      const num2 = stack.pop();

      //* Using currying to get the function, then pass in the values later
      stack.push(map.get(tokens[i])(num2, num1));
    }
  }

  return stack.pop();
}

console.log(reversePolishNotation(["2", "1", "+", "3", "*"])); //* 9
console.log(reversePolishNotation(["4", "13", "5", "/", "+"])); //* 6
console.log(
  reversePolishNotation([
    "10",
    "6",
    "9",
    "3",
    "+",
    "-11",
    "*",
    "/",
    "*",
    "17",
    "+",
    "5",
    "+",
  ])
); //* 22

//* Time: O(n) - It takes O(n) to iterate through every element in the input
//* It takes O(4) -> O(1) time to build the map, and it takes Θ(1) to lookup the current element

//* Space: O(n) - We are guaranteed to always have a valid input
//* But the space usage of the map on average, scales with the size of the input
//* The map always contains 4 elements regardless of input size, so that uses constant space
