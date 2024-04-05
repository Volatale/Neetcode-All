//* If the input length is odd, it will never be balanced
//* Use a count variable to track the number of unbalanced parentheses left
//* If we encounter a "(", we have a new parentheses to balance
//* Else, if we encounter a ")" and the count is NOT 0
//* We DO have a parentheses to balance, so the number of closers is not greater than openers
//* If the count IS 0, we have more closers than openers, and therefore can't balance the string
function isValidParentheses(s) {
  if (s.length % 2 !== 0) return false;

  let count = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      count++;
    } else if (s[i] === ")" && count > 0) {
      count--;
    } else if (count === 0) {
      return false; //* Closing parentheses that don't exist
    }
  }

  return count === 0;
}

console.log(isValidParentheses("()")); //* True
console.log(isValidParentheses("(())")); //* True
console.log(isValidParentheses(")(")); //* False. Count < 0
console.log(isValidParentheses("()()")); //* True
console.log(isValidParentheses("()(")); //* False. Odd Length

//* Time: O(n) - It takes O(n) time to iterate over the entire string

//* Space: O(1) - We only use constant space; the space usage does not scale with the input size
