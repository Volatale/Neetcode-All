//* We need to ensure the correct order, this entails the use of a stack
//* On encountering an "opener", we push the closer counterpart to the stack
//* Since a stack is LIFO, the most recent opener will be closed first
//* If you encounter a closer, make sure the current element is the top of the stack
//* Else if the top element is not equal to the current element, return false
//* The edge case is a situation where the stack is not empty
//* ["(", "("], the stack is [")", ")"] and the default clause never activates
//* So we should return whether stack.length === 0
function validParentheses(str) {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    switch (str[i]) {
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
        if (str[i] !== stack.pop()) return false;
    }
  }

  return stack.length === 0;
}

console.log(validParentheses("()")); //* True
console.log(validParentheses("()[]{}")); //* True
console.log(validParentheses("(]")); //* False
console.log(validParentheses("{}[}")); //* False
console.log(validParentheses("[]{}")); //* True

//* Time: O(n) - The time taken scales with "n"
//* At worst, we add every element to the stack
//* Then that means there are 2n operations in the absolute worst case

//* Space: O(n) - In the worst case, we add every element to the stack
//* Such as an input like: ["(", "(", "("]. The stack looks like: [")",")", ")"]
