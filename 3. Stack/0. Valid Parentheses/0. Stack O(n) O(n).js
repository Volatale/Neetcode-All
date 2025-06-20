//* Given a string containing {, }, (, ), [, and ], we need to determine if the parentheses are valid
//* An input string can only be considered value if all of the following constraints are met:
//*     - Open brackets must be closed by the same type of bracket
//*     - Open brackets must be closed on the correct order
//*     - Evrery close brack has a corresponding open bracket of the same type
//* So we have both an ordering constraint, and a "type" (shape) constraint
//! The MOST RECENT bracket is the one that much be closed first
//* This indicates that we need to process brackets in a LIFO order
//*     - Doing so would also allow us to validate the shapes of the expected parentheses
//* So, we can use a stack to handle both the ordering and processing
//*     - A stack would also give us fast access to the top element (which is the only one we care about)
//* The stack will contain elements that we "need", so if we find a "(", push a ")" onto the stack
//*     - Therefore, if we don't find a corresponding ")" at some point, the string is invalid
//! Also note that we can never have a greater amount of closers than openers (of any type)
function isValid(s) {
  //* Used to handle the LIFO ordering
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
        //* This is not the character we needed
        if (s[i] !== stack.pop()) return false;
    }
  }

  return stack.length === 0;
}

console.log(isValid("()")); //* True
console.log(isValid("()[]{}")); //* True
console.log(isValid("(]")); //* False
console.log(isValid("{}[}")); //* False
console.log(isValid("[]{}")); //* True

//* Time: O(n) - The time taken scales with the input size; we have to process every character

//* Space: O(n) - The stack's size proportionally to the tune of O(n / 2) in the worst case, which simplifies to O(n)
