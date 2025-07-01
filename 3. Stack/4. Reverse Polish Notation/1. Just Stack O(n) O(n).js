//* The goal is to evaluate an expression that was written in Reverse Polish Notation (RPN)
//* The only valid operators are: "+", "-", "*" and "/"
//* However, there are some important notes to understand:
//*     - Each operand is either an integer or one of the above operators
//*     - Division between integers always truncates toward 0 (round down)
//*     - Division by 0 is not allowed (so we don't need to handle that case)
//*     - The answer and all intermediate calculations will fit in a 32-bit integer (so no overflow)
//! Both evaluating expressions and RPN hint to the use of a stack data structure
//* Whenever we see an open parenthesis "(" we know that "this" subexpression must be handled first
//* We can simulate this process by using stacks, since the most recent operands will be the most recent
//! The stack will only store the integers themselves
//* Whenever we encounter a non-integer, we should immediately process the current operation
function evalRPN(tokens) {
  const stack = [];

  for (let char of tokens) {
    switch (char) {
      case "+":
        stack.push(stack.pop() + stack.pop());
        break;
      case "-": {
        const second = stack.pop();
        const first = stack.pop();
        stack.push(second - first);
        break;
      }
      case "*":
        stack.push(stack.pop() * stack.pop());
        break;
      case "/": {
        const second = stack.pop();
        const first = stack.pop();
        stack.push(Math.trunc(first / second));
        break;
      }
      default:
        stack.push(parseInt(char));
        break;
    }
  }

  //* The result is the only element left in the stack
  return stack[0];
}

console.log(evalRPN(["2", "1", "+", "3", "*"])); //* 9
console.log(evalRPN(["4", "13", "5", "/", "+"])); //* 6
console.log(
  evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])
); //* 22

//* Time: O(n) - The time taken scales with the size of the input string's length

//* Space: O(n) - The size of the stack also scales with the input string's length
