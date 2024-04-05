//* Firstly check if the input is of an odd length; it cannot be balanced if it is
//* Use a stack because we care about the order of "balancing"
//* On encountering an "opening" bracket, push the counterpart to the stack
//* Anything within the stack is a separate parentheses string that needs to be balanced
//* Any time we encounter something that is not an opener, pop the top element
//* If the popped element !== the current element (in the string)
//*     - The string balances out of order, or,
//*     - The parentheses string cannot be closed
//* There is an edge case of all "openers" - in this case, we need to check if the stack length is 0
//* If it is, we know all parentheses strings were balanced and therefore the stack should be empty
function validParentheses(s) {
  if (s.length % 2 !== 0) return false;

  const stack = [];

  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "(":
        stack.push(")");
        break;
      case "[":
        stack.push("]");
        break;
      case "{":
        stack.push("}");
        break;
      default:
        if (stack.pop() !== s[i]) return false;
    }
  }

  return stack.length === 0;
}

console.log(validParentheses("()")); //* True
console.log(validParentheses("()[]{}")); //* True
console.log(validParentheses("([{}])")); //* True
console.log(validParentheses("(")); //* False. Odd Length
console.log(validParentheses("[}")); //* False. stack.pop() !== s[i]
console.log(validParentheses("((((")); //* False. stack.pop() !== s[i]

//* Time: O(n) - It takes O(n) time to iterate through the entire string

//* Space: O(n) - In the worst case, something like "((((" would result in the stack having a length of "n"
//* The "n" in this case is 4 since the input length was 4 too; stack length, in the worst case scenario, is proportional to input size
