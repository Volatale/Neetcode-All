//* If the input length is odd, it will never be balanced
//* Use a stack to track the number of unbalanced parentheses left
//* If we encounter a "(", we have a new parentheses to balance
//* Else, if we encounter a ")" and the stack is NOT empty
//* We DO have a parentheses to balance, so the number of closers is not greater than openers
//* If the stack's length IS empty, we have more closers than openers, and therefore can't balance the string
function isValidParentheses(s) {
  if (s.length % 2 !== 0) return false;

  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(")");
    } else if (s[i] === ")" && stack.length > 0) {
      stack.pop();
    } else if (stack.length === 0) {
      return false; //* Closing parentheses that don't exist
    }
  }

  return stack.length === 0;
}

console.log(isValidParentheses("()")); //* True
console.log(isValidParentheses("(())")); //* True
console.log(isValidParentheses(")(")); //* False. Count < 0
console.log(isValidParentheses("()()")); //* True
console.log(isValidParentheses("()(")); //* False. Odd Length

//* Time: O(n) - It takes O(n) time to iterate over the entire string

//* Space: O(n) - In the worst case, if we have a string of all openers like "(((("
//* The other conditions are never triggered, which means we never get to balance any parentheses at all
//* At the end, the stack would have a length of 4, which means 4 unbalanced parentheses strings left
