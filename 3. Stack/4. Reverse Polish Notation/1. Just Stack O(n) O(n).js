//* Push integers to the stack
//* Apply the correct calculation when needed
//* We do second -> first because we do the calculations from left to right
//* The stack pops the "first" element though
//* It only really affects subtraction & division since they are not commutative (A + B) = (B + A)
//* Push the result to the stack
function reversePolishNotation(tokens) {
  const stack = [];

  for (let i = 0; i < tokens.length; i++) {
    switch (tokens[i]) {
      case "+": {
        const first = stack.pop();
        const second = stack.pop();
        stack.push(second + first);
        break;
      }
      case "-": {
        const first = stack.pop();
        const second = stack.pop();

        stack.push(second - first);
        break;
      }
      case "*": {
        const first = stack.pop();
        const second = stack.pop();

        stack.push(second * first);
        break;
      }
      case "/": {
        const first = stack.pop();
        const second = stack.pop();

        //* Division is supposed to be truncated
        stack.push(Math.trunc(second / first));
        break;
      }
      //* We know that anything that is NOT an operator is an integer
      default:
        stack.push(parseInt(tokens[i]));
        break;
    }
  }

  return stack[0];
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
//* Popping from an array takes O(1) time

//* Space: O(n) - We are guaranteed to always have a valid input
//* But the space usage of the map on average, scales with the size of the input
